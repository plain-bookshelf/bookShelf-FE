import type {
  ApiServerError,
  apiResponse,
  signupRequest,
  signupResponse,
} from "../types/signupTypes";
import { publicClient } from "./publicClient";

const url = "/api/member"

const buildSignupError = (status: number, serverError?: ApiServerError) => {
  if (status === 409 && serverError?.code === "MEMBER-001") return "이미 존재하는 유저입니다.";
  if (status === 409 && serverError?.code === "MEMBER-002") return "이미 사용 중인 이메일입니다.";
  if (status === 404 && serverError?.code === "VERIFICATION-001") return "이메일 정보를 찾을 수 없습니다.";
  if (status === 404 && serverError?.code === "AFFILIATION-001") return "소속 도서관 정보를 찾을 수 없습니다.";
  return serverError?.message ?? "회원가입 처리 중 오류가 발생했습니다.";
};

export async function signup(data: signupRequest): Promise<signupResponse> {
  const body = {
    username: data.username.trim(),
    password: data.password,
    email: data.address?.trim() ?? "",
    affiliation_name: data.affiliation_name.trim(),
  };

  const response = await publicClient.post<apiResponse<signupResponse>>(`${url}/signup-member`, body, {
    params: { platformType: "WEB" },
    headers: { "Content-Type": "application/json" },
    validateStatus: () => true,
  });

  if (response.status === 201 && response.data?.data) {
    return response.data.data;
  }

  throw new Error(buildSignupError(response.status, response.data as ApiServerError));
}

export default signup;
