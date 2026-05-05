import type { apiResponse, signupResponse } from "../types/signupTypes";
import { requestWithFallback } from "./publicClient";

interface SignupOfficialRequest {
  username: string;
  password: string;
  email: string;
  affiliation_name: string;
  verification_code: string;
}

export async function signupOfficial(data: SignupOfficialRequest): Promise<signupResponse> {
  const res = await requestWithFallback<apiResponse<signupResponse>>([
    {
      method: "POST",
      url: "/api/signup-official",
      params: { platformType: "WEB" },
      data,
      headers: { "Content-Type": "application/json" },
    },
  ]);

  if (res.status === 201 && res.data?.data) {
    return res.data.data;
  }

  throw new Error((res.data as { message?: string } | undefined)?.message ?? "관계자 회원가입에 실패했어요.");
}

export default signupOfficial;

