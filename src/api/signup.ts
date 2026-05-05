import type {
  ApiServerError,
  apiResponse,
  signupRequest,
  signupResponse,
} from "../types/signupTypes";
import { requestWithFallback } from "./publicClient";

/**
 * signup.ts
 *
 * 회원가입 API 호출을 담당하는 파일이다.
 *
 * 이 파일이 필요한 이유
 * - 화면에서는 단계별로 이메일, 인증번호, 비밀번호, 소속 도서관을 따로 관리한다.
 * - 서버는 최종 가입 순간에 필요한 값만 한 번에 받는다.
 * - 배포 시점에 따라 신규 명세(/api/signup-member)와 예전 명세(/api/auth/signup)가 다를 수 있다.
 *
 * 따라서 이 파일은
 * 1. 화면의 입력값을 서버가 이해하는 body로 합치고,
 * 2. 신규/구 명세를 순서대로 시도하며,
 * 3. 실패 시 화면용 오류 메시지로 바꿔 주는 역할을 한다.
 */

/**
 * 회원가입 실패 응답을 사람이 읽을 수 있는 문장으로 바꾸는 함수
 *
 * 서버는 code 중심으로 응답하는 경우가 많아
 * 페이지에서 그대로 쓰면 의미를 알기 어렵다.
 * 이 함수는 status/code 조합을 한국어 메시지로 변환한다.
 */
const buildSignupError = (status: number, serverError?: ApiServerError) => {
  if (status === 409 && serverError?.code === "MEMBER-001") return "이미 존재하는 유저입니다.";
  if (status === 409 && serverError?.code === "MEMBER-002") return "이미 사용 중인 이메일입니다.";
  if (status === 404 && serverError?.code === "VERIFICATION-001") return "이메일 정보를 찾을 수 없어요.";
  if (status === 404 && serverError?.code === "AFFILIATION-001") return "소속 도서관 정보를 찾을 수 없어요.";
  return serverError?.message ?? "회원가입 처리 중 오류가 발생했어요.";
};

/**
 * 실제 회원가입 요청
 *
 * @param data 회원가입 페이지에서 수집한 최종 입력값
 * @returns 서버가 생성한 회원 정보 응답
 */
export async function signup(data: signupRequest): Promise<signupResponse> {
  /**
   * 최신 명세 body
   *
   * 신규 API는 email 키를 사용하고,
   * nickname 없이도 가입이 가능하다.
   */
  const specBody = {
    username: data.username.trim(),
    password: data.password,
    email: data.address?.trim() ?? "",
    affiliation_name: data.affiliation_name.trim(),
  };

  /**
   * 예전 명세 body
   *
   * 기존 백엔드와의 호환을 위해 남겨 둔 body다.
   * address, nickname 같은 예전 키 이름을 그대로 맞춰 보낸다.
   */
  const legacyBody = {
    username: data.username.trim(),
    nickname: data.nickname ?? data.username.trim(),
    password: data.password,
    address: data.address?.trim() ?? "",
    affiliation_name: data.affiliation_name.trim(),
  };

  /**
   * 새 명세를 먼저 시도하고,
   * 서버가 아직 구 버전이라면 예전 경로로 자동 fallback한다.
   */
  const res = await requestWithFallback<apiResponse<signupResponse>>([
    {
      method: "POST",
      url: "/api/signup-member",
      params: { platformType: "WEB" },
      data: specBody,
      headers: { "Content-Type": "application/json" },
    },
    {
      method: "POST",
      url: "/api/auth/signup",
      data: legacyBody,
      headers: { "Content-Type": "application/json" },
    },
  ]);

  /**
   * 회원가입은 보통 201 Created를 성공으로 사용한다.
   * data가 실제로 존재하는지도 함께 확인해 불완전한 응답을 막는다.
   */
  if (res.status === 201 && res.data?.data) {
    return res.data.data;
  }

  throw new Error(buildSignupError(res.status, res.data as ApiServerError));
}

export default signup;

