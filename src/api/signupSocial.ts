import type { apiResponse, signupResponse } from "../types/signupTypes";
import { publicClient } from "./publicClient";

interface SignupSocialRequest {
  affiliation_name: string;
  register_token: string;
}

export async function signupSocial(data: SignupSocialRequest): Promise<signupResponse> {
  const response = await publicClient.post<apiResponse<signupResponse>>("/signup-social", data, {
    params: { platformType: "WEB" },
    headers: { "Content-Type": "application/json" },
    validateStatus: () => true,
  });

  if (response.status === 201 && response.data?.data) {
    return response.data.data;
  }

  throw new Error((response.data as { message?: string } | undefined)?.message ?? "소셜 회원가입에 실패했습니다.");
}

export default signupSocial;
