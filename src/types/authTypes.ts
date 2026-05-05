export type PlatformType = "WEB" | "ANDROID" | "IOS";

export interface LoginRequest {
  username: string;
  password: string;
  platformType?: PlatformType;
}

export interface LoginTokenData {
  username?: string;
  authority?: string;
  platform_type?: PlatformType;
  affiliation_name?: string;
  profile_image?: string;
  oauth_provider?: string;
  access_token: string;
  refresh_token: string;
  expires_in?: number;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

// 재발급 응답은 현재 로그인 응답과 같은 토큰 구조를 그대로 재사용한다.
export type TokenReissueResponseData = LoginTokenData;
