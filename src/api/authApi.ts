import { getAccessToken, getRefreshToken } from "../utils/tokenService";
import type {
  ApiResponse,
  LoginRequest,
  LoginTokenData,
  TokenReissueResponseData,
} from "../types/authTypes";
import { publicClient, requestWithFallback } from "./publicClient";

/**
 * authApi.ts
 *
 * 인증(auth)과 직접 관련된 서버 요청을 한곳에 모아 둔 파일이다.
 *
 * 이 파일에서 다루는 일
 * 1. 로그인 요청을 보내 access / refresh token을 받아 온다.
 * 2. 저장해 둔 refresh token으로 access token을 다시 발급받는다.
 * 3. 로그아웃 요청을 보내 서버 세션을 정리한다.
 *
 * 페이지 컴포넌트에서는 "로그인 버튼을 눌렀을 때 무엇을 보여 줄지"만 신경 쓰고,
 * 실제 HTTP 요청 형식과 서버 응답 해석은 이 파일이 맡는다.
 * 이렇게 분리해 두면 UI를 바꾸더라도 인증 요청 로직은 안정적으로 재사용할 수 있다.
 */

interface ApiErrorResponse {
  code?: string;
  message?: string;
}

/**
 * 서버 명세가 배포 버전마다 조금씩 달랐던 이력이 있어
 * /api/auth/... 와 /api/... 두 경로를 모두 후보로 둔다.
 *
 * requestWithFallback는 이 후보들을 순서대로 호출해 보고,
 * 실제로 열려 있는 엔드포인트를 자동으로 선택해 준다.
 */
const AUTH_BASE_CANDIDATES = ["/api/auth", "/api"];

/**
 * 서버가 내려준 status/code 조합을 사용자가 읽을 수 있는 한국어 문장으로 바꾼다.
 *
 * 페이지에서 바로 서버 원문을 보여 주면
 * - 코드값(AUTH-003 등)을 사용자가 이해하기 어렵고
 * - 서버 문구가 바뀔 때 화면 경험이 흔들릴 수 있다.
 *
 * 그래서 이 함수는 "서버 오류"를 "화면용 오류 메시지"로 번역하는 역할을 한다.
 */
const readError = (status: number, data?: ApiErrorResponse) => {
  if (status === 400 && data?.code === "AUTH-003") return "비밀번호가 일치하지 않습니다.";
  if (status === 404 && data?.code === "MEMBER-003") return "일치하는 사용자 정보를 찾을 수 없어요.";
  if (status === 404 && data?.code === "AFFILIATION-001") return "소속 정보를 찾을 수 없어요.";
  return data?.message ?? "인증 요청 처리 중 오류가 발생했어요.";
};

/**
 * 로그인 요청
 *
 * 매개변수로 받은 loginData는 페이지에서 관리하던 입력값이다.
 * 이 함수는 그 입력값을 서버 명세에 맞는 형태로 바꿔 POST /login 요청을 보낸다.
 *
 * 반환값
 * - 성공 시 access_token, refresh_token 등이 들어 있는 LoginTokenData
 * - 실패 시 사람이 읽을 수 있는 Error
 */
export const postLogin = async (loginData: LoginRequest): Promise<LoginTokenData> => {
  /**
   * platformType은 어떤 플랫폼에서 로그인했는지 서버에 알리는 값이다.
   * 현재 프론트는 웹이므로 기본값을 WEB으로 통일한다.
   */
  const platformType = loginData.platformType ?? "WEB";

  /**
   * 화면에서 쓰는 state 이름은 자유롭지만,
   * 서버는 username / password 키 이름을 기대하므로 여기서 명세 형태로 정리한다.
   */
  const body = {
    username: loginData.username,
    password: loginData.password,
  };

  /**
   * requestWithFallback는 후보 경로를 하나씩 시도한 뒤
   * 404/405가 아닌 첫 번째 응답을 반환한다.
   *
   * 덕분에 프론트는 서버 경로가 약간 달라져도
   * 페이지 쪽 코드를 바꾸지 않고 같은 함수만 계속 사용할 수 있다.
   */
  const res = await requestWithFallback<ApiResponse<LoginTokenData>>(
    AUTH_BASE_CANDIDATES.map((base) => ({
      method: "POST",
      url: `${base}/login`,
      params: { platformType },
      data: body,
      headers: { "Content-Type": "application/json" },
    })),
  );

  /**
   * 서버마다 200 또는 201을 성공으로 줄 수 있으므로 둘 다 허용한다.
   * 또한 실제로 토큰이 존재하는지도 함께 검사해야
   * 형식만 성공이고 data가 비어 있는 응답을 걸러낼 수 있다.
   */
  if ((res.status === 200 || res.status === 201) && res.data?.data?.access_token) {
    return res.data.data;
  }

  throw new Error(readError(res.status, res.data as ApiErrorResponse));
};

/**
 * 토큰 재발급 요청
 *
 * access token이 만료되었을 때 refresh token으로 새 access token을 받아 온다.
 * 보통 axios 인터셉터나 보호된 API 호출 흐름에서 이 함수를 사용한다.
 */
export const postTokenReissue = async (): Promise<TokenReissueResponseData> => {
  /**
   * 현재 브라우저에 저장된 토큰을 꺼낸다.
   * refresh token이 없으면 재발급 자체가 불가능하므로 바로 종료한다.
   */
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("NO_TOKENS");
  }

  const res = await requestWithFallback<ApiResponse<TokenReissueResponseData>>(
    AUTH_BASE_CANDIDATES.map((base) => ({
      method: "PUT",
      url: `${base}/reissue`,
      params: { platformType: "WEB" },
      headers: {
        /**
         * 일부 서버는 만료 직전 access token도 함께 요구할 수 있어
         * 남아 있다면 Authorization 헤더도 같이 실어 보낸다.
         */
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        /**
         * 현재 백엔드 명세에서는 refresh token을 X-Refresh-Token 헤더로 받는다.
         * 따라서 body가 아니라 헤더에 넣어 보낸다.
         */
        "X-Refresh-Token": refreshToken,
      },
    })),
  );

  if ((res.status === 200 || res.status === 201) && res.data?.data?.access_token) {
    return res.data.data;
  }

  /**
   * 재발급 실패는 이후 라우팅 처리에 직접 영향을 주기 때문에
   * 단순 문장 대신 페이지에서 분기하기 쉬운 에러 키를 함께 던진다.
   */
  const errorBody = res.data as ApiErrorResponse;
  if (res.status === 404) {
    throw new Error(errorBody.code === "AUTH-005" ? "REFRESH_TOKEN_INVALID" : "MEMBER_NOT_FOUND");
  }

  throw new Error(readError(res.status, errorBody));
};

/**
 * 로그아웃 요청
 *
 * 서버가 토큰 무효화나 세션 정리를 하고 있다면 이 요청이 의미를 가진다.
 * 클라이언트에서 토큰을 지우는 것과 별개로,
 * "서버에게도 이 사용자가 로그아웃했다"고 알려 주는 단계라고 보면 된다.
 */
export const postLogout = async (): Promise<void> => {
  const accessToken = getAccessToken();

  const res = await publicClient.post<ApiResponse<string> | ApiErrorResponse>(
    "/api/auth/logout",
    undefined,
    {
      /**
       * 로그아웃은 실패 상태 코드도 직접 해석하고 싶어서
       * axios가 중간에 예외를 던지지 않게 validateStatus를 열어 둔다.
       */
      validateStatus: () => true,
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    },
  );

  /**
   * 어떤 서버는 204(No Content), 어떤 서버는 200을 반환하므로 둘 다 성공으로 간주한다.
   */
  if (res.status === 204 || res.status === 200) {
    return;
  }

  throw new Error((res.data as ApiErrorResponse | undefined)?.message ?? "로그아웃에 실패했어요.");
};

