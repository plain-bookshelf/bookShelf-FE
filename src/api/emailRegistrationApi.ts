import axios from "axios";
import type{ 
    EmailSendRequest, 
    EmailVerifyRequest, 
    ApiResponse, 
    EmailVerifyResponse 
} from "../types/emailTypes";
import axiosInstance from "./apiClient";

// API 기본 URL (실제 백엔드 서버 URL로 변경해야 합니다)
const BASE_URL = ""; 

/**
 * 이메일 인증번호 전송 API 호출 (POST /email/send)
 * @param address - 인증 요청할 이메일 주소
 * @returns Promise<ApiResponse>
 */
export async function sendEmailVerification(address: string): Promise<ApiResponse> {
    const endpoint = `${BASE_URL}/email/send`;
    
    const requestBody: EmailSendRequest = {
        address: address,
    };
    
    const finalBody = address ? requestBody : {};
    
    try {
        const response = await axiosInstance.post<ApiResponse>(
            endpoint, 
            finalBody, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 201 && response.data.status === "success") {
            console.log("이메일 인증 요청 성공:", response.data.message);
            return response.data;
        } else {
             throw new Error(`인증 요청 실패: ${response.data.message || '예상치 못한 응답입니다.'}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = (error.response?.data as ApiResponse)?.message || "이메일 전송에 실패했습니다.";
            console.error("이메일 인증 요청 실패 (Axios Error):", errorMessage);
            throw new Error(errorMessage);
        } else {
            console.error("이메일 인증 요청 실패 (Unknown Error):", error);
            throw new Error("알 수 없는 오류가 발생했습니다.");
        }
    }
}


/**
 * 이메일 인증번호 확인 API 호출 (PUT /email/verify)
 * @param address - 이메일 주소
 * @param verificationCode - 사용자가 입력한 인증번호
 * @returns Promise<EmailVerifyResponse>
 */
export async function verifyEmailCode(address: string, verificationCode: string): Promise<EmailVerifyResponse> {
    const endpoint = `${BASE_URL}/email/verify`;

    const requestBody: EmailVerifyRequest = {
        address: address,
        verification_code: verificationCode
    };

    try {
        // PUT 메서드 사용
        const response = await axiosInstance.put<EmailVerifyResponse>(
            endpoint, 
            requestBody, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // Success Response: status 201 OK
        if (response.status === 201 && response.data.status === "success") {
            console.log("이메일 인증 확인 성공:", response.data.message);
            return response.data;
        } else {
             // 201이지만 status가 success가 아닌 경우 (예: 인증번호 불일치 시 서버에서 201을 반환하며 status: 'fail'을 보낼 경우)
             throw new Error(`인증 확인 실패: ${response.data.message || '예상치 못한 응답입니다.'}`);
        }

    } catch (error) {
        // Axios 에러 처리
        if (axios.isAxiosError(error)) {
            // 서버에서 에러 응답(예: 400 Bad Request)을 보낸 경우
            const errorMessage = (error.response?.data as ApiResponse)?.message || "인증번호 확인에 실패했습니다.";
            console.error("이메일 인증 확인 실패 (Axios Error):", errorMessage);
            throw new Error(errorMessage);
        } else {
            console.error("이메일 인증 확인 실패 (Unknown Error):", error);
            throw new Error("알 수 없는 오류가 발생했습니다.");
        }
    }
}