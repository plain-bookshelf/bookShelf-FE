import axios from "axios";
import axiosInstance from "./apiClient";
import type {
  LoginRequest,
  ApiResponse,
  LoginTokenData,
  TokenReissueRequest,
  LoginTokenData as TokenReissueResponseData,
} from "../types/authTypes";
import { getRefreshToken, removeTokens } from "../utils/tokenService";

const AUTH_BASE = "/auth";

/**
 * 1. 로그인 (POST /api/auth/login)
 * - 토큰 필요 없음
 */
export const postLogin = async (
  loginData: LoginRequest
): Promise<ApiResponse<LoginTokenData>> => {
  try {
    const res = await axiosInstance.post<ApiResponse<LoginTokenData>>(
      `${AUTH_BASE}/login`,
      loginData
    );
    return res.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("네트워크 오류가 발생했습니다.");
  }
};

/**
 * 2. 토큰 재발급 (POST /api/auth/reissue)
 * - refresh_token 필요
 * - 여기서는 공용 axiosInstance 대신, CORS/인터셉터 영향 없는 전용 axios 사용
 */
export const postTokenReissue = async (
  reissueData: TokenReissueRequest
): Promise<ApiResponse<TokenReissueResponseData>> => {
  const refreshToken = getRefreshToken() || reissueData.refresh_token;

  if (!refreshToken) {
    throw new Error("리프레시 토큰이 없어 재발급을 시도할 수 없습니다.");
  }

  // 프록시 기준 상대 경로 사용
  const reissueClient = axios.create({
    baseURL: "/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  const res = await reissueClient.post<
    ApiResponse<TokenReissueResponseData>
  >(`${AUTH_BASE}/reissue`, reissueData);

  if (res.status !== 201) {
    throw new Error(
      `토큰 재발급에 실패했습니다. (HTTP ${res.status})`
    );
  }

  return res.data;
};

/**
 * 3. 로그아웃 (POST /api/auth/logout)
 */
export const postLogout = async (): Promise<void> => {
  try {
    const res = await axiosInstance.post(
      `${AUTH_BASE}/logout`,
      {},
      {
        validateStatus: (status) => status === 200 || status === 204,
      }
    );

    if (res.status === 204) {
      console.log("로그아웃 성공: 204 No Content");
    } else if (res.status === 200) {
      console.log("로그아웃 성공: 200 OK");
    }

    removeTokens();
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(
      "네트워크 오류 또는 알 수 없는 오류로 로그아웃에 실패했습니다."
    );
  }
};
