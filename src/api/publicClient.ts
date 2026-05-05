import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const Server_IP = import.meta.env.VITE_APP_Server_IP;
const normalizeBaseUrl = (url?: string) => url?.trim().replace(/^"|"$/g, "").replace(/\/+$/, "");

export const publicClient = axios.create({
  // 로그인/회원가입 계열은 쿠키 세션이 아니라 토큰 응답을 사용하므로
  // credentials를 강제하지 않아야 개발 환경 CORS 조건이 덜 엄격해진다.
  baseURL: normalizeBaseUrl(Server_IP),
});

export interface FallbackRequestConfig<T = unknown> extends AxiosRequestConfig<T> {
  url: string;
}

export async function requestWithFallback<T>(
  candidates: Array<FallbackRequestConfig>,
): Promise<AxiosResponse<T>> {
  let lastError: unknown;

  for (const candidate of candidates) {
    try {
      const response = await publicClient.request<T>({
        validateStatus: () => true,
        ...candidate,
      });

      // 서버 버전에 따라 경로가 다를 수 있어 404/405만 다음 후보를 시도한다.
      if (response.status === 404 || response.status === 405) {
        lastError = new Error(`ENDPOINT_NOT_AVAILABLE:${candidate.url}`);
        continue;
      }

      return response;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("ENDPOINT_NOT_FOUND");
}
