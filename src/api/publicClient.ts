import axios from "axios";

/**
 * publicClient
 *
 * 로그인 전 단계에서 사용하는 공개 API 전용 axios 인스턴스다.
 * 현재 실행에 필요한 역할은 baseURL 정리와 기본 인스턴스 생성뿐이다.
 */

const serverIp = import.meta.env.VITE_APP_Server_IP;

/**
 * 환경변수에 공백, 큰따옴표, 마지막 슬래시가 섞여 들어와도
 * axios baseURL로 바로 사용할 수 있도록 정리한다.
 */
const normalizeBaseUrl = (url?: string) => url?.trim().replace(/^"|"$/g, "").replace(/\/+$/, "");

export const publicClient = axios.create({
  baseURL: normalizeBaseUrl(serverIp),
  withCredentials: true,
});

/**
 * 아래 fallback 유틸은 예전 서버 경로 호환을 위해 만들어둔 코드다.
 * 현재 프로젝트는 최신 API 경로만 사용하므로 직접 실행에는 필요하지 않다.
 * 나중에 다시 예전 서버 호환이 필요할 때만 주석을 해제해서 사용하면 된다.
 */
/*
import type { AxiosRequestConfig, AxiosResponse } from "axios";

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
*/
