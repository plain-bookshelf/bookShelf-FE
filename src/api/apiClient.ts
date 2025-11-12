import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosError,
  type AxiosRequestHeaders,
  type InternalAxiosRequestConfig,
} from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setTokens,
} from "../utils/tokenService";
import { postTokenReissue } from "./authApi";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api",
});

/** url 정규화 (baseURL 유무 상관없이 /api 이후 경로만 비교) */
const extractPurePath = (url?: string): string => {
  if (!url) return "";
  // 절대/상대 구분 없이 /api 이후만 추출
  try {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      const u = new URL(url);
      return u.pathname.startsWith("/api") ? u.pathname.slice(4) : u.pathname;
    }
  } catch {
    /* ignore */
  }
  return url.startsWith("/api") ? url.slice(4) : url;
};

// 공개 엔드포인트: 토큰 자동 부착/재발급 제외
const isPublicUrl = (url?: string): boolean => {
  const pure = extractPurePath(url);
  return (
    pure.startsWith("/auth/login") ||
    pure.startsWith("/auth/reissue") ||
    pure.startsWith("/public")
  );
};

let isTokenRefreshing = false;

type FailedRequest = {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: AxiosRequestConfig & { _retry?: boolean };
};

let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token?: string) => {
  failedQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      if (token) {
        if (!p.config.headers) p.config.headers = {} as AxiosRequestHeaders;
        (p.config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
      }
      p.resolve(axiosInstance(p.config));
    }
  });
  failedQueue = [];
};

/**
 * 요청 인터셉터
 * - public URL 아니고 access token 있으면 Authorization 항상 최신값으로 세팅 (덮어쓰기)
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // ✅ 헤더 객체 보장
    if (!config.headers) config.headers = {} as AxiosRequestHeaders;
    const headers = config.headers as AxiosRequestHeaders;

    // ✅ 모든 요청에 Content-Type 강제 세팅
    // (FormData처럼 브라우저가 자동 세팅해야 하는 경우만 예외 처리)
    if (!(config.data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    // ✅ 모든 요청에 Accept 세팅
    if (!headers.Accept) headers.Accept = "application/json";

    // ✅ Authorization (비공개 API에만)
    const token = getAccessToken();
    if (token && !isPublicUrl(config.url)) {
      headers.Authorization = `Bearer ${token}`;
    }

    // ✅ 디버그 로그
    if (import.meta.env.DEV) {
      const pure = extractPurePath(config.url);
      console.debug(
        "[REQ]",
        config.method?.toUpperCase(),
        pure || config.url,
        "token:",
        token ? token.slice(0, 12) + "..." + token.slice(-12) : "(none)"
      );
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
/**
 * 응답 인터셉터
 * - 401 발생 시 /auth/reissue 한 번 시도
 * - 성공 시 대기중인 요청들 모두 새 토큰으로 재시도
 * - 실패(REFRESH_TOKEN_INVALID, MEMBER_NOT_FOUND 등) 시 토큰 삭제 & 에러 반환
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = (error.config || {}) as AxiosRequestConfig & {
      _retry?: boolean;
    };

    const status = error.response?.status;
    const pure = extractPurePath(originalConfig.url);

    // 재발급 제외 조건들
    if (!originalConfig || originalConfig._retry || isPublicUrl(originalConfig.url) || status !== 401) {
      return Promise.reject(error);
    }

    // 리프레시 토큰 없으면 바로 로그아웃
    if (!getRefreshToken()) {
      removeTokens();
      return Promise.reject(error);
    }

    originalConfig._retry = true;

    // 이미 다른 요청이 갱신 중이면 큐에 적재
    if (isTokenRefreshing) {
      console.debug("[REFRESH] queueing request:", pure || originalConfig.url);
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalConfig });
      });
    }

    isTokenRefreshing = true;

    try {
      console.debug("[REFRESH] start: calling /auth/reissue");

      const reissueData = await postTokenReissue();

      // 새 토큰 저장
      setTokens({
        access_token: reissueData.access_token,
        refresh_token: reissueData.refresh_token,
        expires_in: reissueData.expires_in,
      });


      console.debug(
        "[REFRESH] success: new token",
        reissueData.access_token.slice(0, 12),
        "...",
        reissueData.access_token.slice(-12)
      );

      // 큐 처리
      processQueue(null, reissueData.access_token);

      // 원요청 갱신 후 재시도
      if (!originalConfig.headers) originalConfig.headers = {} as AxiosRequestHeaders;
      (originalConfig.headers as AxiosRequestHeaders).Authorization = `Bearer ${reissueData.access_token}`;

      console.debug("[RETRY]", pure || originalConfig.url);

      return axiosInstance(originalConfig);
    } catch (e: any) {
      const msg = e?.message || "";

      console.debug("[REFRESH] failed:", msg);

      // 명세상 만료/불일치는 모두 "다시 로그인"
      if (
        msg.startsWith("REFRESH_TOKEN_INVALID") ||
        msg.startsWith("MEMBER_NOT_FOUND") ||
        msg.startsWith("NO_TOKENS") ||
        msg.startsWith("REISSUE_FAILED") ||
        msg.startsWith("REISSUE_INVALID_RESPONSE")
      ) {
        removeTokens();
      }

      processQueue(e, undefined);
      return Promise.reject(e);
    } finally {
      isTokenRefreshing = false;
    }
  }
);

export default axiosInstance;