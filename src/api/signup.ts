import axios from "axios";
import axiosInstance from './apiClient';
import type {signupRequest, signupResponse, apiResponse} from "../types/signupTypes"

// const SIGNUP_ENDPOINT = "/api/auth/signup";

/**
 * 회원가입 API 호출 함수
 * @param data - SignupRequest 타입의 요청 데이터
 * @returns 성공 시 SignupResponseData, 실패 시 에러 throw
 */

export async function signup(data: signupRequest): Promise<signupResponse> {
    const url = `/api/auth/signup`;

    const requestBody = { ...data };
    if (!requestBody.address || requestBody.address.trim() === "") {
        delete requestBody.address;
    }
    console.log(requestBody);

    try {
        // axios.post에 응답 타입(ApiResponse<SignupResponseData>)을 제네릭으로 전달
        const response = await axiosInstance.post<apiResponse<signupResponse>>(url, requestBody);

        // 응답 데이터의 data 필드를 반환 (SignupResponseData 타입)
        return response.data.data;

    } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        // 서버에서 반환한 상세 오류 데이터
        const serverError = error.response.data as { code: string; message: string; };

        let customErrorMessage = serverError.message || "알 수 없는 오류가 발생했습니다.";

        if (status === 409) {
            // 409 Conflict: 중복 오류
            if (serverError.code === "M003") {
                // 이미 등록된 아이디 오류
                customErrorMessage = "아이디가 이미 존재합니다.";
            } else if (serverError.code === "M004") {
                // 이미 등록된 닉네임 오류
                customErrorMessage = "닉네임이 이미 사용 중입니다.";
            }
            // ... M002 등 다른 409 오류 처리
            
        } else if (status === 400) {
            // 400 Bad Request: 잘못된 요청 오류
            if (serverError.code === "C001") {
                customErrorMessage = "인증 코드가 일치하지 않습니다.";
            }
        }
        
        // 프론트엔드에서 컴포넌트에게 전달할 에러 객체 생성
        throw new Error(customErrorMessage);
    }
    
    throw new Error("네트워크 연결에 문제가 발생했습니다.");
  }
}

export default signup;