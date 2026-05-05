import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

/**
 * publicClient.ts
 *
 * 로그인 전에도 호출할 수 있는 "공개 API용 axios 클라이언트"를 정의하는 파일이다.
 *
 * 이 파일의 핵심 역할
 * 1. baseURL이 정리된 axios 인스턴스를 하나 만든다.
 * 2. 서버 경로가 버전마다 달라질 때 사용할 fallback 요청 도우미를 제공한다.
 *
 * 예를 들어 어떤 배포 환경은 /api/auth/login 을 쓰고,
 * 다른 환경은 /api/login 을 쓸 수 있다.
 * requestWithFallback는 이런 차이를 페이지에서 몰라도 되게 만든다.
 */

const serverIp = import.meta.env.VITE_APP_Server_IP;

/**
 * 환경변수에 실수로 공백, 따옴표, 마지막 슬래시가 들어가 있으면
 * /api 경로를 붙일 때 이중 슬래시가 생기거나 URL이 틀어질 수 있다.
 * 그래서 axios 인스턴스를 만들기 전에 한 번 정규화한다.
 */
const normalizeBaseUrl = (url?: string) => url?.trim().replace(/^"|"$/g, "").replace(/\/+$/, "");

/**
 * 공개 API 전용 axios 인스턴스
 *
 * 로그인 전 요청에서는 쿠키 세션이나 인증 인터셉터가 필요하지 않기 때문에
 * 가장 단순한 형태로 만든다.
 */
export const publicClient = axios.create({
  baseURL: normalizeBaseUrl(serverIp),
});

/**
 * fallback 후보 요청 한 개를 표현하는 타입
 *
 * AxiosRequestConfig를 그대로 쓰면 url이 optional이라
 * 후보 목록을 만들 때 실수로 url 없이 넣어도 타입 에러가 나지 않는다.
 * 그래서 url만큼은 반드시 존재하도록 강제했다.
 */
export interface FallbackRequestConfig<T = unknown> extends AxiosRequestConfig<T> {
  url: string;
}

/**
 * 여러 후보 엔드포인트를 순서대로 시도하는 공통 헬퍼
 *
 * 사용 예시
 * - 첫 번째 후보: 최신 명세 경로
 * - 두 번째 후보: 구 버전 서버 호환 경로
 *
 * 동작 방식
 * 1. candidates를 앞에서부터 하나씩 요청한다.
 * 2. 404 또는 405가 나오면 "이 경로는 현재 서버에 없음"으로 보고 다음 후보로 넘어간다.
 * 3. 그 외 응답이 오면 성공/실패 여부와 무관하게 그 응답을 호출한 쪽으로 돌려준다.
 * 4. 모든 후보가 실패하면 마지막 에러를 던진다.
 *
 * 왜 404/405만 특별 취급하나?
 * - 이 둘은 보통 "경로 자체가 다르다"는 의미다.
 * - 반면 400, 401, 409 같은 응답은 경로는 맞고 요청 내용만 잘못된 경우가 많다.
 *   그런 응답은 다음 후보로 넘기지 말고 그대로 해석해야 한다.
 */
export async function requestWithFallback<T>(
  candidates: Array<FallbackRequestConfig>,
): Promise<AxiosResponse<T>> {
  let lastError: unknown;

  for (const candidate of candidates) {
    try {
      const response = await publicClient.request<T>({
        /**
         * 상태 코드가 4xx/5xx여도 즉시 throw하지 않고
         * 응답 본문을 직접 해석할 수 있게 validateStatus를 열어 둔다.
         */
        validateStatus: () => true,
        ...candidate,
      });

      if (response.status === 404 || response.status === 405) {
        lastError = new Error(`ENDPOINT_NOT_AVAILABLE:${candidate.url}`);
        continue;
      }

      return response;
    } catch (error) {
      /**
       * 네트워크 오류, CORS, DNS 문제처럼 응답 자체를 받지 못한 경우는
       * 여기서 lastError에 저장한 뒤 다음 후보를 시도한다.
       */
      lastError = error;
    }
  }

  throw lastError ?? new Error("ENDPOINT_NOT_FOUND");
}
