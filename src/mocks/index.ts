

// export async function signup(data: signupRequest): Promise<signupResponse> {
//     console.log("Mocking: 회원가입 요청 데이터 수신:", data);

//     // 1초 후 성공 응답을 시뮬레이션
//     await new Promise(resolve => setTimeout(resolve, 1000)); 

//     // 명세서의 성공 응답 데이터 구조와 동일하게 하드코딩된 데이터를 반환
//     const mockSuccessData: signupResponse = {
//         user_id: 999,
//         user_name: data.user_name,
//         nick_name: data.nick_name,
//         authority: "ROLE_USER",
//         emails: data.address ? [{ email_id: 1, address: data.address, verified: true, delivered: false }] : []
//     };

//     return mockSuccessData; // 성공 데이터 반환
//     // 실패를 테스트하려면: throw new Error("아이디가 이미 존재합니다.");
//   }