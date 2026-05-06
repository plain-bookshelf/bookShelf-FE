import { getAccessToken, getOrCreateDeviceToken, getRefreshToken } from "../utils/tokenService";
import type {
  ApiResponse,
  LoginRequest,
  LoginTokenData,
  TokenReissueResponseData,
} from "../types/authTypes"
import { publicClient } from "./publicClient"

interface ApiErrorResponse {
  code?: string;
  message?: string;
}

const url = "/api/auth"

const readError = (status: number, data?: ApiErrorResponse) => {
  if (status === 400 && data?.code === "AUTH-003") return "비밀번호가 일치하지 않습니다."
  if (status === 404 && data?.code === "MEMBER-003") return "일치하는 사용자 정보를 찾을 수 없습니다."
  if (status === 404 && data?.code === "AFFILIATION-001") return "소속 정보를 찾을 수 없습니다."
  return data?.message ?? "인증 요청 처리 중 오류가 발생했습니다."
}

export const postLogin = async (loginData: LoginRequest): Promise<LoginTokenData> => {
  const platformType = loginData.platformType ?? "WEB";
  const deviceToken = platformType === "WEB" ? null : getOrCreateDeviceToken();

  const response = await publicClient.post<ApiResponse<LoginTokenData>>(
    `${url}/login`,
    {
      username: loginData.username,
      password: loginData.password,
    },
    {
      params: { platformType },
      headers: {
        "Content-Type": "application/json",
        ...(deviceToken ? { "X-Device-Token": deviceToken } : {}),
      },
      validateStatus: () => true,
    },
  );

  if (import.meta.env.DEV) {
    console.debug("[LOGIN_REQUEST]", {
      username: loginData.username,
      passwordLength: loginData.password.length,
      deviceToken,
      platformType,
      statusCode: response.status,
      responseBody: response.data,
    });
  }

  if ((response.status === 200 || response.status === 201) && response.data?.data?.access_token) {
    return response.data.data;
  }

  throw new Error(readError(response.status, response.data as ApiErrorResponse));
};

export const postTokenReissue = async (): Promise<TokenReissueResponseData> => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("NO_TOKENS")
  }

  const response = await publicClient.put<ApiResponse<TokenReissueResponseData>>(
    `${url}/reissue`,
    undefined,
    {
      params: { platformType: "WEB" },
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        "X-Refresh-Token": refreshToken,
      },
      validateStatus: () => true,
    },
  );

  if ((response.status === 200 || response.status === 201) && response.data?.data?.access_token) {
    return response.data.data;
  }

  const errorBody = response.data as ApiErrorResponse;
  if (response.status === 404) {
    throw new Error(errorBody.code === "AUTH-005" ? "REFRESH_TOKEN_INVALID" : "MEMBER_NOT_FOUND");
  }

  throw new Error(readError(response.status, errorBody))
}

export const postLogout = async (): Promise<void> => {
  const accessToken = getAccessToken()

  const response = await publicClient.post<ApiResponse<string> | ApiErrorResponse>(
    `${url}/logout`,
    undefined,
    {
      params: { platformType: "WEB" },
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      validateStatus: () => true,
    },
  )

  if (response.status === 204 || response.status === 200) {
    return
  }

  throw new Error((response.data as ApiErrorResponse | undefined)?.message ?? "로그아웃에 실패했습니다.")
}
