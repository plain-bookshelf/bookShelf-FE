export interface LoginRequest {
  credential: string;
  password: string;
}


export interface LoginTokenData {
  grant_type: "Bearer";
  access_token: string;
  expires_in: number;
  refresh_token: string;
}


export interface ApiResponse<T> {
  status: "OK" | string;
  message: string;
  data: T;
}

export interface TokenReissueRequest {
  refresh_token: string;
  access_token: string;
}

export type TokenReissueResponseData = LoginTokenData;