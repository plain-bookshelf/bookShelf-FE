import axios from "axios";
import type{ 
    LoginRequest, 
    ApiResponse, 
    LoginTokenData, 
    TokenReissueRequest,
    LoginTokenData as TokenReissueResponseData
} from "../types/authTypes";
import { getRefreshToken } from '../utils/tokenService';

const API_BASE_URL = "/api/auth";

/**
 * 1. 로그인 API 호출 함수 (POST /api/auth/login)
 */
export const postLogin = async (
  loginData: LoginRequest
): Promise<ApiResponse<LoginTokenData>> => {
  try {
    const response = await axios.post<ApiResponse<LoginTokenData>>(
      `http://13.125.65.240:8080${API_BASE_URL}/login`,
      loginData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || 
        (error.response.status === 404 ? "회원정보가 없습니다." : "로그인에 실패했습니다.")
      );
    }
    throw new Error("네트워크 오류가 발생했습니다.");
  }
};


/**
 * 2. 토큰 재발급 API 호출 함수 (POST /api/auth/reissue)
 * - 이 함수는 주로 axios 인터셉터에서 호출됩니다.
 */
export const postTokenReissue = async (
  reissueData: TokenReissueRequest
): Promise<ApiResponse<TokenReissueResponseData>> => {
    
  const refreshTokenAsBearer = getRefreshToken() || reissueData.refresh_token; 

  if (!refreshTokenAsBearer) {
      throw new Error("리프레시 토큰이 로컬에 없어 토큰 갱신을 시도할 수 없습니다.");
  }
  
  // try/catch를 제거하고, 에러 처리를 호출자(인터셉터)에게 위임합니다.
  const response = await axios.post<ApiResponse<TokenReissueResponseData>>(
    `${API_BASE_URL}/reissue`, 
    reissueData, 
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${refreshTokenAsBearer}`, 
      },
    }
  );

  if (response.status !== 201) {
      // 201이 아닌 경우 (성공했지만 상태 코드가 다름)에만 예외를 던짐.
      throw new Error("토큰 재발급에 실패했습니다. (HTTP Status: " + response.status + ")");
  }
  
  return response.data;
};

// export const postLogout = async (): Promise<void> => {
//     const endpoint = "/api/auth/logout"; // 명세서 EndPoint: POST /api/auth/logout
    
//     // Request Body는 비어있습니다.
//     const requestBody = {}; 

//     try {
//         // axiosInstance를 사용하여 Authorization 헤더(Bearer Token)와 Content-Type을 자동으로 처리
//         const response = await axiosInstance.post(endpoint, requestBody, {
//             // 명세서 상의 성공 Status: 204 OK (204 No Content로 간주)
//             // axios의 기본 validateStatus는 200~300 사이를 성공으로 보므로, 204를 명시적으로 허용하거나 그대로 둡니다.
//             // 204는 No Content이므로 response.data가 비어있습니다.
//             validateStatus: (status) => status === 200 || status === 204, 
//         });

//         if (response.status === 204) {
//             console.log("로그아웃 성공: 204 No Content");
//         } else if (response.status === 200) {
//              // 204 대신 200 OK를 반환할 경우를 대비하여 처리 (명세서에는 204 OK)
//              console.log("로그아웃 성공: 200 OK (204 예상)");
//         }
        
//         // 🌟 로그아웃 성공 시 프론트엔드에서도 로컬 토큰 삭제
//         removeTokens();
        
//         return;

//     } catch (error) {
//         // Axios 에러 처리
//         if (axios.isAxiosError(error) && error.response) {
//             const status = error.response.status;
//             const serverError = error.response.data as { message?: string };
            
//             // 403 Forbidden (ACCESS_TOKEN_NOT_MATCH 등)
//             if (status === 403) {
//                  const errorMessage = serverError.message || "유효하지 않은 토큰입니다. 다시 로그인 해주세요.";
//                  throw new Error(`로그아웃 실패 (403): ${errorMessage}`);
//             }
            
//             // 그 외 다른 에러 처리
//             const errorMessage = serverError.message || `로그아웃 실패: ${error.message}`;
//             throw new Error(errorMessage);
//         }
        
//         throw new Error("네트워크 오류 또는 알 수 없는 오류로 로그아웃에 실패했습니다.");
//     }
// };

