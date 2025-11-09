import axios from "axios";
import axiosInstance from "./apiClient";
import { getAccessToken, getRefreshToken, removeTokens } from "../utils/tokenService";
import type { DeleteAccountResponse } from "../types/deleteAccount";

const DELETE_ACCOUNT_ENDPOINT = "/api/auth/delete";

export async function deleteAccount(): Promise<DeleteAccountResponse> {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken || !refreshToken) {
    throw new Error("로그인 정보가 없습니다. 다시 로그인 후 시도해주세요.");
  }

  try {
    const body = {
      access_token: accessToken,
      refresh_token: refreshToken,
    };

    const res = await axiosInstance.post(DELETE_ACCOUNT_ENDPOINT, body, {
      // Authorization 헤더는 axiosInstance.request 인터셉터에서 자동 주입됨
    });

    // 204 No Content 인 경우 (명세 기준)
    if (res.status === 204 || !res.data) {
      removeTokens(); // 로컬 저장 토큰 정리
      return {
        status: "NO_CONTENT",
        message: "successfully delete user.",
        data: "",
      };
    }

    // 서버에서 JSON 응답을 내려주는 경우 처리
    const { status, message, data } = res.data as {
      status?: string;
      message?: string;
      data?: string | null;
    };

    removeTokens();

    return {
      status: status || "NO_CONTENT",
      message: message || "successfully delete user.",
      data: data ?? "",
    };
  } catch (error: any) {
    // axios 에러 처리
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response as {
        status: number;
        data?: { code?: string; message?: string };
      };

      const code = data?.code;
      const serverMessage = data?.message;

      if (status === 401) {
        // 명세: ACCESS_TOKEN_NOT_MATCH (A003)
        if (code === "A003") {
          throw new Error("유효하지 않은 access token 입니다.");
        }
        throw new Error(serverMessage || "인증이 만료되었습니다. 다시 로그인 후 시도해주세요.");
      }

      if (status === 404) {
        throw new Error(serverMessage || "회원 정보를 찾을 수 없습니다.");
      }

      throw new Error(serverMessage || "회원탈퇴 처리 중 오류가 발생했습니다.");
    }

    throw new Error("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
}

export default deleteAccount;