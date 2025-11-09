import axios from 'axios';
import type{ AxiosInstance, AxiosRequestConfig, AxiosError }  from 'axios';
import { getAccessToken, setTokens, removeTokens, getRefreshToken } from '../utils/tokenService'; // 경로에 맞게 수정 필요
import { postTokenReissue } from './authApi'; // 경로에 맞게 수정 필요
import type{ LoginTokenData, TokenReissueRequest } from '../types/authTypes';

// --- 인터셉터 상태 관리 변수 ---
let isTokenRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: unknown) => void; config: AxiosRequestConfig }[] = [];

const isAuthUrl = (url?: string) => {
  if (!url) return false;
  return (
    url.includes('/api/auth/login') ||
    url.includes('/api/auth/signup') ||
    url.includes('/api/auth/reissue')
  );
};

// 실패한 요청들을 재시도하거나 실패 처리하는 함수
const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            // 새 토큰으로 헤더 업데이트 후 재시도
            prom.config.headers = prom.config.headers || {};
            prom.config.headers['Authorization'] = `Bearer ${token}`;
            axiosInstance.request(prom.config).then(prom.resolve).catch(prom.reject);
        }
    });
    failedQueue = [];
};
// -----------------------------

// AxiosInstance 타입 정의를 모듈에서 직접 가져와 사용 (import type 에러 회피)


// 기본 Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://13.124.75.92:8080",
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: Access Token 삽입
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    // 토큰 갱신 API(reissue)를 호출할 때는 Access Token을 헤더에 넣지 않도록 제외
     if (token && !isAuthUrl(config.url)) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// 응답 인터셉터: 401 에러 처리 및 토큰 갱신 로직 (Refresh Token 만료 확인)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const url = originalRequest?.url || '';
    const refreshToken = getRefreshToken();

    // ✅ auth 관련 요청이면: 토큰 재발급/강제 이동 하지 말고 그대로 에러만 던짐
    if (isAuthUrl(url)) {
      return Promise.reject(error);
    }


    // ✅ 그 외 API에서만 401 → 토큰 재발급 로직 수행
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshToken) {
        removeTokens();
        window.location.href = '/login';
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
          access_token: accessToken || '',
          refresh_token: refreshToken,
        };

        const response = await postTokenReissue(reissueData);
        const newTokens: LoginTokenData = response.data;

        setTokens(newTokens);
        processQueue(null, newTokens.access_token);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers['Authorization'] = `Bearer ${newTokens.access_token}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh Token is expired or invalid. Re-login required.', refreshError);
        removeTokens();
        processQueue(error);
        window.location.href = '/login';
        return Promise.reject(error);
      } finally {
        isTokenRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;