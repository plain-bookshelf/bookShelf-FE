import type { apiResponse, signupResponse } from "../types/signupTypes";
import { publicClient } from "./publicClient";

interface SignupOfficialRequest {
  username: string;
  password: string;
  email: string;
  affiliation_name: string;
  verification_code: string;
}

const url = "/api/member"

export async function signupOfficial(data: SignupOfficialRequest): Promise<signupResponse> {
  const response = await publicClient.post<apiResponse<signupResponse>>(`${url}/signup-official`, data, {
    params: { platformType: "WEB" },
    headers: { "Content-Type": "application/json" },
    validateStatus: () => true,
  });

  if (response.status === 201 && response.data?.data) {
    return response.data.data;
  }

  throw new Error((response.data as { message?: string } | undefined)?.message ?? "관리자 회원가입에 실패했습니다.");
}

export default signupOfficial;
