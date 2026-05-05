// 회원가입 타입은 새 명세 필드와 기존 화면 입력 구조를 동시에 수용하도록 작성돼 있다.
export interface signupRequest {
  username: string;
  nickname?: string;
  password: string;
  address?: string;
  affiliation_name: string;
}

export interface signupResponse {
  username: string;
  access_token: string;
  refresh_token: string;
  authority: string;
  platform_type: "WEB" | "ANDROID" | "IOS";
  affiliation_name: string;
  profile_image: string;
  oauth_provider: string;
}

export interface apiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface ApiServerError {
  // 서버 코드가 있을 때 화면에서 더 구체적인 에러 메시지로 바꿔 보여 준다.
  code?: string;
  message?: string;
}
