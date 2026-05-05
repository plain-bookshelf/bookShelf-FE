import type { ApiResponse, EmailSendRequest, EmailVerifyRequest, EmailVerifyResponse, VerificationCodeType } from "../types/emailTypes";
import { requestWithFallback } from "./publicClient";

// 이메일 인증 API는 회원가입과 비밀번호 찾기에서 공통으로 재사용된다.
const EMAIL_SEND_CANDIDATES = ["/api/email/send"];
const EMAIL_VERIFY_CANDIDATES = ["/api/email/verify"];

const readErrorMessage = (fallback: string, payload?: { message?: string }) => payload?.message ?? fallback;

export async function sendEmailCode(
  email: string,
  codeType: VerificationCodeType,
): Promise<ApiResponse> {
  // 명세 기준으로 body에는 email, query에는 codeType이 들어간다.
  const body: EmailSendRequest = { email };

  const res = await requestWithFallback<ApiResponse>(
    EMAIL_SEND_CANDIDATES.map((url) => ({
      method: "POST",
      url,
      params: { codeType },
      data: body,
      headers: { "Content-Type": "application/json" },
    })),
  );

  if ((res.status === 200 || res.status === 201) && res.data?.status) {
    return res.data;
  }

  throw new Error(readErrorMessage("이메일 전송에 실패했어요.", res.data as { message?: string }));
}

export async function sendEmailVerification(email: string): Promise<ApiResponse> {
  return sendEmailCode(email, "VERIFICATION_EMAIL");
}

export async function verifyEmailCode(
  email: string,
  verificationCode: string,
): Promise<EmailVerifyResponse> {
  // 서버는 verification_code라는 snake_case 필드명을 요구한다.
  const body: EmailVerifyRequest = { email, verification_code: verificationCode };

  const res = await requestWithFallback<EmailVerifyResponse>(
    EMAIL_VERIFY_CANDIDATES.map((url) => ({
      method: "POST",
      url,
      data: body,
      headers: { "Content-Type": "application/json" },
    })),
  );

  if ((res.status === 200 || res.status === 201) && res.data?.status) {
    return res.data;
  }

  throw new Error(readErrorMessage("인증번호 확인에 실패했어요.", res.data as { message?: string }));
}
