import { sendEmailCode } from "./emailRegistrationApi";
import { requestWithFallback } from "./publicClient";
import axiosInstance from "./apiClient";

interface BaseResponse<T = string | boolean> {
  status: string;
  message: string;
  data: T;
}

export const sendFindPasswordEmail = async (email: string): Promise<void> => {
  await sendEmailCode(email, "FIND_PASSWORD");
};

export const verifyFindPasswordCode = async (
  email: string,
  verificationCode: string,
): Promise<boolean> => {
  const res = await requestWithFallback<BaseResponse<boolean>>([
    {
      method: "POST",
      url: "/api/find-password",
      data: { email, verification_code: verificationCode },
      headers: { "Content-Type": "application/json" },
    },
    {
      method: "POST",
      url: "/api/auth/find-password/verify",
      data: { address: email, verification_code: verificationCode },
      headers: { "Content-Type": "application/json" },
    },
  ]);

  if ((res.status === 200 || res.status === 201) && res.data?.data === true) {
    return true;
  }

  throw new Error((res.data as { message?: string } | undefined)?.message ?? "인증에 실패했어요.");
};

export const resetPasswordByFind = async (email: string, newPassword: string): Promise<void> => {
  const res = await requestWithFallback<BaseResponse>([
    {
      method: "PATCH",
      url: "/api/password-resest",
      data: { email, new_password: newPassword },
      headers: { "Content-Type": "application/json" },
    },
    {
      method: "PATCH",
      url: "/api/password-reset",
      data: { email, new_password: newPassword },
      headers: { "Content-Type": "application/json" },
    },
  ]);

  if (res.status === 200 || res.status === 201) {
    return;
  }

  if (res.status === 404) {
    throw new Error("MEMBER_NOT_FOUND");
  }

  throw new Error((res.data as { message?: string } | undefined)?.message ?? "비밀번호 재설정에 실패했어요.");
};

export const changePassword = async (
  existingPassword: string,
  newPassword: string,
): Promise<void> => {
  // 로그인 상태 비밀번호 변경은 access token으로 사용자를 식별한다.
  const res = await axiosInstance.patch<BaseResponse>(
    "/api/password-change",
    {
      existing_password: existingPassword,
      new_password: newPassword,
    },
    {
      headers: { "Content-Type": "application/json" },
      validateStatus: () => true,
    },
  );

  if (res.status === 200) {
    return;
  }

  if (res.status === 400) {
    throw new Error("NOT_MATCH_EXISTING_PASSWORD");
  }

  if (res.status === 404) {
    throw new Error("MEMBER_NOT_FOUND");
  }

  throw new Error((res.data as { message?: string } | undefined)?.message ?? "비밀번호 변경에 실패했어요.");
};
