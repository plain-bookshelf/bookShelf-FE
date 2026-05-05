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

const Server_IP = import.meta.env.VITE_APP_Server_IP;
const normalizeBaseUrl = (url?: string) => url?.trim().replace(/^"|"$/g, "").replace(/\/+$/, "");

const axiosInstance: AxiosInstance = axios.create({
  baseURL: normalizeBaseUrl(Server_IP),
});

/** url 정규화 (/api 유무와 상관없이 동일 비교) */
const extractPurePath = (url?: string): string => {
  if (!url) return "";
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

// 공개 엔드포인트는 토큰 자동 부착/재발급 대상에서 제외한다.
const isPublicUrl = (url?: string): boolean => {
  const pure = extractPurePath(url);
  return (
    pure.startsWith("/auth/login") ||
    pure.startsWith("/auth/reissue") ||
    pure.startsWith("/public") ||
    pure.startsWith("/email/send") ||
    pure.startsWith("/email/verify") ||
    pure.startsWith("/auth/signup")
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
 * - public URL이 아니고 access token이 있으면 Authorization 헤더를 붙인다.
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.headers) config.headers = {} as AxiosRequestHeaders;
    const headers = config.headers as AxiosRequestHeaders;

    if (!(config.data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    if (!headers.Accept) headers.Accept = "application/json";

    const token = getAccessToken();
    if (token && !isPublicUrl(config.url)) {
      headers.Authorization = `Bearer ${token}`;
    }

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
 * - 401이면 /auth/reissue를 1회 시도한다.
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = (error.config || {}) as AxiosRequestConfig & {
      _retry?: boolean;
    };
    const status = error.response?.status;

    if (!originalConfig || originalConfig._retry || isPublicUrl(originalConfig.url) || status !== 401) {
      return Promise.reject(error);
    }

    if (!getRefreshToken()) {
      removeTokens();
      return Promise.reject(error);
    }

    originalConfig._retry = true;

    if (isTokenRefreshing) {
      const pure = extractPurePath(originalConfig.url);
      console.debug("[REFRESH] queueing request:", pure || originalConfig.url);
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalConfig });
      });
    }

    isTokenRefreshing = true;

    try {
      console.debug("[REFRESH] start: calling /auth/reissue");
      const reissueData = await postTokenReissue();

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

      processQueue(null, reissueData.access_token);

      if (!originalConfig.headers) originalConfig.headers = {} as AxiosRequestHeaders;
      (originalConfig.headers as AxiosRequestHeaders).Authorization = `Bearer ${reissueData.access_token}`;

      console.debug("[RETRY]", extractPurePath(originalConfig.url) || originalConfig.url);
      return axiosInstance(originalConfig);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.debug("[REFRESH] failed:", msg);

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

if (typeof window !== "undefined") {
  (window as Window & { dbgGetToken?: () => string | null; dbgGetRefresh?: () => string | null }).dbgGetToken = () => getAccessToken();
  (window as Window & { dbgGetToken?: () => string | null; dbgGetRefresh?: () => string | null }).dbgGetRefresh = () => getRefreshToken();
}

export default axiosInstance;
