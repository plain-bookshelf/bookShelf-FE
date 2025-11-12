import axios from "axios";
import axiosInstance from "./apiClient";
import type {
  EmailSendRequest,
  EmailVerifyRequest,
  ApiResponse,
  EmailVerifyResponse,
} from "../types/emailTypes";

const EMAIL_BASE = "/email";

/** 이메일 인증코드 전송: POST /api/email/send */
export async function sendEmailVerification(
  address: string
): Promise<ApiResponse> {
  const body: EmailSendRequest = { address };

  try {
    const res = await axiosInstance.post<ApiResponse>(
      `${EMAIL_BASE}/send`,
      body
    );

    if (res.status === 201 || res.data.status === "CREATED") {
      return res.data;
    }
    throw new Error(res.data?.message || "이메일 전송에 실패했습니다.");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const data = error.response.data as ApiResponse;
      throw new Error(data?.message || "이메일 전송에 실패했습니다.");
    }
    throw new Error("네트워크 오류가 발생했습니다.");
  }
}

/** 이메일 인증코드 검증: PUT /api/email/verify */
export async function verifyEmailCode(
  address: string,
  verificationCode: string
): Promise<EmailVerifyResponse> {
  const body: EmailVerifyRequest = {
    address,
    verification_code: verificationCode,
  };

  try {
    const res = await axiosInstance.put<EmailVerifyResponse>(
      `${EMAIL_BASE}/verify`,
      body
    );

    if (res.status === 201 || (res.data as any).status === "CREATED") {
      return res.data;
    }

    throw new Error(
      (res.data as any)?.message || "인증번호 확인에 실패했습니다."
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const data = error.response.data as ApiResponse;
      throw new Error(
        data?.message || "인증번호 확인에 실패했습니다."
      );
    }
    throw new Error("네트워크 오류가 발생했습니다.");
  }
}