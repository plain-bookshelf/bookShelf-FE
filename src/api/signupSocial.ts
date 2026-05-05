import type { apiResponse, signupResponse } from "../types/signupTypes";
import { requestWithFallback } from "./publicClient";

interface SignupSocialRequest {
  affiliation_name: string;
  register_token: string;
}

export async function signupSocial(data: SignupSocialRequest): Promise<signupResponse> {
  const res = await requestWithFallback<apiResponse<signupResponse>>([
    {
      method: "POST",
      url: "/api/signup-social",
      params: { platformType: "WEB" },
      data,
      headers: { "Content-Type": "application/json" },
    },
  ]);

  if (res.status === 201 && res.data?.data) {
    return res.data.data;
  }

  throw new Error((res.data as { message?: string } | undefined)?.message ?? "소셜 회원가입에 실패했어요.");
}

export default signupSocial;
