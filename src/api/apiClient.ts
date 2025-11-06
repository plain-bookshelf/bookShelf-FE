import axios from 'axios';
import type{ AxiosInstance, AxiosRequestConfig, AxiosError }  from 'axios';
import { getAccessToken, setTokens, removeTokens, getRefreshToken } from '../utils/tokenService'; // 경로에 맞게 수정 필요
import { postTokenReissue } from './authApi'; // 경로에 맞게 수정 필요
import type{ LoginTokenData, TokenReissueRequest } from '../types/authTypes';

// --- 인터셉터 상태 관리 변수 ---
let isTokenRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: unknown) => void; config: AxiosRequestConfig }[] = [];

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
  baseURL: "http://13.125.65.240:8080",
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: Access Token 삽입
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    // 토큰 갱신 API(reissue)를 호출할 때는 Access Token을 헤더에 넣지 않도록 제외
    if (token && config.url !== '/api/auth/reissue' && config.url?.endsWith('/login') === false) { 
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// 응답 인터셉터: 401 에러 처리 및 토큰 갱신 로직 (Refresh Token 만료 확인)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const refreshToken = getRefreshToken();

    // 1. Access Token 만료 에러 (401) 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      originalRequest._retry = true;

      // 1-1. Refresh Token이 없으면 즉시 재로그인으로 이동
      if (!refreshToken) {
        removeTokens();
        window.location.href = '/logIn'; 
        return Promise.reject(error);
      }

      // 1-2. 이미 갱신 시도가 진행 중인 경우, 요청을 큐에 저장
      if (isTokenRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      // 1-3. 토큰 갱신 시작
      isTokenRefreshing = true;

      try {
        const accessToken = getAccessToken();
        
        const reissueData: TokenReissueRequest = {
            access_token: accessToken || "", 
            refresh_token: refreshToken
        };

        const response = await postTokenReissue(reissueData);
        const newTokens: LoginTokenData = response.data;

        // 2. 갱신 성공: 새 토큰 저장 및 대기열 요청 재시도
        setTokens(newTokens);
        processQueue(null, newTokens.access_token);
        
        // 3. 원래 실패했던 요청 재시도
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers['Authorization'] = `Bearer ${newTokens.access_token}`;
        return axiosInstance(originalRequest);
        
      } catch (refreshError) {
        // 4. 갱신 실패 (Refresh Token 만료): 재로그인 처리
        console.error("Refresh Token is expired or invalid. Re-login required.", refreshError);
        removeTokens();
        processQueue(error); // 대기열 요청 모두 실패 처리
        window.location.href = '/login'; 
        return Promise.reject(error);

      } finally {
        isTokenRefreshing = false;
      }
    }
    
    // 401 에러가 아니거나 이미 재시도한 요청은 그대로 에러 반환
    return Promise.reject(error);
  }
);

export default axiosInstance;