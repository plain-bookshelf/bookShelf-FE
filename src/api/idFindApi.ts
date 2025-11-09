import axios from "axios";
import axiosInstance from "./apiClient";

export async function sendFindIdEmail(address: string) {
  const res = await axiosInstance.post("/api/auth/find-id/send", { address });
  return res.data; // { status, message, data }
}

export interface FindIdSendResponse {
  status: string;   // "OK"
  message: string;  // "successfully find-username send."
  data: string;
}

export interface FindIdVerifyResponse {
  status: string;   // "OK"
  message: string;  // "successfully find-verified verified."
  data: string;     // 아이디 (예: "kim")
}

// 아이디 찾기 - 인증코드 이메일 발송
export async function requestFindIdCode(address: string): Promise<FindIdSendResponse> {
  const res = await axiosInstance.post("/api/auth/find-id/send", { address });
  return res.data;
}

const publicAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 아이디 찾기 - 인증코드 검증 + 아이디 조회
export async function verifyFindIdCode(address: string, verificationCode: string): Promise<FindIdVerifyResponse> {
  const res = await publicAxios.post("/api/auth/find-id/verify", {
    address,
    verfication_code: verificationCode,
  });
  return res.data;
}