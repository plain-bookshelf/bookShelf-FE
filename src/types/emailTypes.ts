export type VerificationCodeType = "VERIFICATION_EMAIL" | "FIND_PASSWORD";

export interface ApiResponse {
  status: string;
  message: string;
  data: Record<string, unknown> | string | boolean;
}

export interface EmailSendRequest {
  email: string;
}

export interface EmailVerifyRequest {
  email: string;
  verification_code: string;
}

export type EmailSendResponse = ApiResponse;
export type EmailVerifyResponse = ApiResponse;
