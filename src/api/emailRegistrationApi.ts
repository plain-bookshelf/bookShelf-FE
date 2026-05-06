import type {
  ApiResponse,
  EmailSendRequest,
  EmailVerifyRequest,
  EmailVerifyResponse,
  VerificationCodeType,
} from "../types/emailTypes";
import { publicClient } from "./publicClient";

const url = "/api/verification";

const readErrorMessage = (fallback: string, payload?: { message?: string }) =>
  payload?.message ?? fallback;

export async function sendEmailCode(
  email: string,
  codeType: VerificationCodeType,
): Promise<ApiResponse> {
  const body: EmailSendRequest = { email };

  const response = await publicClient.post<ApiResponse>(`${url}/email/send`, body, {
    params: { codeType },
    headers: { "Content-Type": "application/json" },
    validateStatus: () => true,
  });

  if (import.meta.env.DEV) {
    console.debug("[EMAIL_SEND]", {
      email,
      codeType,
      statusCode: response.status,
      responseBody: response.data,
    });
  }

  if ((response.status === 200 || response.status === 201) && response.data?.status) {
    return response.data;
  }

  throw new Error(readErrorMessage("이메일 전송에 실패했습니다.", response.data as { message?: string }));
}

export async function sendEmailVerification(email: string): Promise<ApiResponse> {
  return sendEmailCode(email, "VERIFICATION_EMAIL");
}

export async function verifyEmailCode(
  email: string,
  verificationCode: string,
): Promise<EmailVerifyResponse> {
  const body: EmailVerifyRequest = { email, verification_code: verificationCode };

  const response = await publicClient.post<EmailVerifyResponse>(`${url}/email/verify`, body, {
    headers: { "Content-Type": "application/json" },
    validateStatus: () => true,
  });

  if (import.meta.env.DEV) {
    console.debug("[EMAIL_VERIFY]", {
      email,
      verificationCode,
      statusCode: response.status,
      responseBody: response.data,
    });
  }

  if ((response.status === 200 || response.status === 201) && response.data?.status) {
    return response.data;
  }

  throw new Error(
    readErrorMessage("인증번호 확인에 실패했습니다.", response.data as { message?: string }),
  );
}
