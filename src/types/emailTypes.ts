export interface ApiResponse {
    status: "success" | "fail" | "error";
    message: string;
    data: Record<string, unknown>; 
}

// 요청 (Request) 타입 
export interface EmailSendRequest {
    address: string; // 필수지만, 빈 문자열 ("")도 가능하도록 하여 API 로직에서 처리
}


// 이메일 인증번호 확인 요청 (PUT /email/verify)

export interface EmailVerifyRequest {
    address: string;
    verification_code: string;
}


export type EmailSendResponse = ApiResponse;

export type EmailVerifyResponse = ApiResponse;