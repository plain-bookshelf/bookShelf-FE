import axios from "axios";
import { storage, ACCESS_TOKEN_KEY } from "../utils/tokenService";

// 백엔드 일반 관리 API 요청에 사용하는 기본 axios 인스턴스다.
const Server_IP = import.meta.env.VITE_APP_Server_IP;
const normalizeBaseUrl = (url?: string) => url?.trim().replace(/^"|"$/g, "").replace(/\/+$/, "");

export const instance = axios.create({
  baseURL: normalizeBaseUrl(Server_IP),
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
// access token이 있으면 Authorization 헤더만 붙인다.
instance.interceptors.request.use(
  (config) => {
    const accessToken = storage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

