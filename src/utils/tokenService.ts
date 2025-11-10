import type{ LoginTokenData } from '../types/authTypes';

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";


 // Access Token을 가져옴.
export const getAccessToken = (): string | null => {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

// Refresh Token을 가져옴.
export const getRefreshToken = (): string | null => {
  return sessionStorage.getItem(REFRESH_TOKEN_KEY);
};


 // 토큰 정보를 저장
export const setTokens = (tokenData: LoginTokenData): void => {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, tokenData.access_token);
  sessionStorage.setItem(REFRESH_TOKEN_KEY, tokenData.refresh_token);
};


 //모든 토큰을 제거 (로그아웃/세션 만료 시)
export const removeTokens = (): void => {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};