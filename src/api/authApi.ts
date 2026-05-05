import { getAccessToken, getRefreshToken } from "../utils/tokenService";
import { publicClient, requestWithFallback } from "./publicClient";
import type { ApiResponse, LoginRequest, LoginTokenData, TokenReissueResponseData } from "../types/authTypes";

interface ApiErrorResponse {
  code?: string;
  message?: string;
}

const AUTH_BASE_CANDIDATES = ["/api/auth", "/api"];

const readError = (status: number, data?: ApiErrorResponse) => {
  if (status === 400 && data?.code === "AUTH-003") return "비밀번호가 일치하지 않습니다.";
  if (status === 404 && data?.code === "MEMBER-003") return "일치하는 사용자 정보를 찾을 수 없어요.";
  if (status === 404 && data?.code === "AFFILIATION-001") return "소속 정보를 찾을 수 없어요.";
  return data?.message ?? "인증 요청 처리 중 오류가 발생했어요.";
};

export const postLogin = async (loginData: LoginRequest): Promise<LoginTokenData> => {
  const platformType = loginData.platformType ?? "WEB";
  const body = {
    username: loginData.username,
    password: loginData.password,
  };

  const res = await requestWithFallback<ApiResponse<LoginTokenData>>(
    AUTH_BASE_CANDIDATES.map((base) => ({
      method: "POST",
      url: `${base}/login`,
      params: { platformType },
      data: body,
      headers: { "Content-Type": "application/json" },
    })),
  );

  if ((res.status === 200 || res.status === 201) && res.data?.data?.access_token) {
    return res.data.data;
  }

  throw new Error(readError(res.status, res.data as ApiErrorResponse));
};

export const postTokenReissue = async (): Promise<TokenReissueResponseData> => {
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
        // 새 명세는 refresh token을 body가 아니라 헤더로 받는다.
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        "X-Refresh-Token": refreshToken,
      },
    })),
  );

  if ((res.status === 200 || res.status === 201) && res.data?.data?.access_token) {
    return res.data.data;
  }

  const errorBody = res.data as ApiErrorResponse;
  if (res.status === 404) {
    throw new Error(errorBody.code === "AUTH-005" ? "REFRESH_TOKEN_INVALID" : "MEMBER_NOT_FOUND");
  }

  throw new Error(readError(res.status, errorBody));
};

export const postLogout = async (): Promise<void> => {
  const accessToken = getAccessToken();

  const res = await publicClient.post<ApiResponse<string> | ApiErrorResponse>(
    "/api/auth/logout",
    undefined,
    {
      validateStatus: () => true,
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    },
  );

  if (res.status === 204 || res.status === 200) {
    return;
  }

  throw new Error((res.data as ApiErrorResponse | undefined)?.message ?? "로그아웃에 실패했어요.");
};
