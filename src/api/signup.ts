import type { ApiServerError, apiResponse, signupRequest, signupResponse } from "../types/signupTypes";
import { requestWithFallback } from "./publicClient";

// 회원가입은 새 명세와 구 명세를 함께 지원하기 위해 fallback 요청 구조를 사용한다.
const buildSignupError = (status: number, serverError?: ApiServerError) => {
  if (status === 409 && serverError?.code === "MEMBER-001") return "이미 존재하는 유저입니다.";
  if (status === 409 && serverError?.code === "MEMBER-002") return "이미 사용 중인 이메일입니다.";
  if (status === 404 && serverError?.code === "VERIFICATION-001") return "이메일 정보를 찾을 수 없어요.";
  if (status === 404 && serverError?.code === "AFFILIATION-001") return "소속 도서관 정보를 찾을 수 없어요.";
  return serverError?.message ?? "회원가입 처리 중 오류가 발생했어요.";
};

export async function signup(data: signupRequest): Promise<signupResponse> {
  // 새 명세와 구 명세가 요구하는 필드명이 달라 두 버전 body를 모두 준비한다.
  const specBody = {
    username: data.username.trim(),
    password: data.password,
    email: data.address?.trim() ?? "",
    affiliation_name: data.affiliation_name.trim(),
  };

  const legacyBody = {
    username: data.username.trim(),
    nickname: data.nickname ?? data.username.trim(),
    password: data.password,
    address: data.address?.trim() ?? "",
    affiliation_name: data.affiliation_name.trim(),
  };

  const res = await requestWithFallback<apiResponse<signupResponse>>([
    {
      method: "POST",
      url: "/api/signup-member",
      params: { platformType: "WEB" },
      data: specBody,
      headers: { "Content-Type": "application/json" },
    },
    {
      // 구 서버가 남아 있을 때만 예전 회원가입 경로로 한 번 더 시도한다.
      method: "POST",
      url: "/api/auth/signup",
      data: legacyBody,
      headers: { "Content-Type": "application/json" },
    },
  ]);

  if (res.status === 201 && res.data?.data) {
    return res.data.data;
  }

  throw new Error(buildSignupError(res.status, res.data as ApiServerError));
}

export default signup;
