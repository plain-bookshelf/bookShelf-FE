import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  removeTokens,
} from "../utils/tokenService";
import { postTokenReissue } from "./authApi";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
} from "axios";
import type {
  LoginTokenData,
  TokenReissueRequest,
} from "../types/authTypes";

let isTokenRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: AxiosRequestConfig;
}[] = [];

// 공개 엔드포인트: 토큰 자동 부착/재발급 대상에서 제외
const isPublicUrl = (url?: string) => {
  if (!url) return false;
  return (
    url.startsWith("/auth/login") ||
    url.startsWith("/auth/signup") ||
    url.startsWith("/auth/reissue") ||
    url.startsWith("/auth/find-id") ||
    url.startsWith("/auth/find-pw") ||
    url.startsWith("/email")
  );
};

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((job) => {
    if (error) {
      job.reject(error);
    } else if (token) {
      job.config.headers = job.config.headers || {};
      job.config.headers.Authorization = `Bearer ${token}`;
      axiosInstance
        .request(job.config)
        .then(job.resolve)
        .catch(job.reject);
    }
  });
  failedQueue = [];
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: public URL 제외하고 토큰 부착
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (!isPublicUrl(config.url) && token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 시 토큰 재발급 (public URL 제외)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    const url = originalRequest?.url || "";
    const status = error.response?.status;
    const refreshToken = getRefreshToken();

    // 🔴 여기 isAuthUrl → isPublicUrl 로 수정
    if (isPublicUrl(url)) {
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshToken) {
        removeTokens();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isTokenRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isTokenRefreshing = true;

      try {
        const accessToken = getAccessToken();
        const reissueData: TokenReissueRequest = {
          access_token: accessToken || "",
          refresh_token: refreshToken,
        };

        const res = await postTokenReissue(reissueData);
        const newTokens: LoginTokenData = res.data;

        setTokens(newTokens);
        processQueue(null, newTokens.access_token);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization =
          `Bearer ${newTokens.access_token}`;

        return axiosInstance(originalRequest);
      } catch (e) {
        console.error("토큰 재발급 실패. 재로그인 필요.", e);
        removeTokens();
        processQueue(error);
        window.location.href = "/login";
        return Promise.reject(e);
      } finally {
        isTokenRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;