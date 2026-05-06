import axios from "axios";

/**
 * idFindApi.ts
 *
 * "아이디 찾기" 흐름에서 사용하는 서버 통신만 분리한 파일이다.
 *
 * 전체 흐름
 * 1. 사용자가 이메일을 입력한다.
 * 2. requestFindIdCode가 해당 이메일로 인증번호 발송을 요청한다.
 * 3. 사용자가 인증번호를 입력한다.
 * 4. verifyFindIdCode가 인증번호를 검증하고, 일치하면 아이디를 돌려준다.
 *
 * 이 파일은 쿠키 기반 인증이 아니라 비로그인 공개 흐름이므로
 * access token 인터셉터가 들어간 apiClient 대신 별도 axios 인스턴스를 사용한다.
 */

/**
 * 인증번호 발송 응답 형식
 *
 * data는 서버 구현에 따라 단순 문자열일 수 있다.
 * 화면에서는 주로 status/message 성공 여부만 참고한다.
 */
export interface FindIdSendResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * 인증번호 검증 응답 형식
 *
 * data에 최종적으로 찾은 아이디가 들어온다.
 * 즉, 이 API는 "인증 성공 여부"와 "찾은 아이디"를 함께 돌려주는 역할을 한다.
 */
export interface FindIdVerifyResponse {
  status: string;
  message: string;
  data: string;
}

const serverIp = import.meta.env.VITE_APP_Server_IP;

/**
 * .env 값에 공백, 따옴표, 마지막 슬래시가 섞여 들어오면
 * axios baseURL이 이상하게 붙을 수 있다.
 * 그래서 서버 주소를 한 번 정리해서 사용한다.
 */
const normalizeBaseUrl = (url?: string) => url?.trim().replace(/^"|"$/g, "").replace(/\/+$/, "");

/**
 * 아이디 찾기는 공개 API라서 credentials나 토큰 헤더가 필요 없다.
 * 따라서 가장 단순한 axios 인스턴스를 따로 만든다.
 */
const publicAxios = axios.create({
  baseURL: normalizeBaseUrl(serverIp),
});

/**
 * 아이디 찾기용 인증번호 발송 요청
 *
 * @param address 사용자가 입력한 이메일 주소
 * @returns 서버 공통 응답(status, message 등)
 *
 * 이 함수는 아직 아이디를 찾는 단계가 아니다.
 * 먼저 "이 이메일로 가입한 계정이 있는지"를 서버가 검사하고,
 * 있다면 인증번호를 보낼 수 있게 준비하는 단계라고 이해하면 된다.
 */
export async function requestFindIdCode(address: string): Promise<FindIdSendResponse> {
  const response = await publicAxios.post("/api/auth/find-id/send", { address });
  return response.data;
}

/**
 * 예전 코드에서 sendFindIdEmail이라는 이름을 이미 쓰고 있어서
 * 호출부를 대량 수정하지 않도록 별칭(alias)을 함께 제공한다.
 */
export const sendFindIdEmail = requestFindIdCode;

/**
 * 아이디 찾기용 인증번호 검증 요청
 *
 * @param address 인증번호를 받은 이메일 주소
 * @param verificationCode 사용자가 입력한 인증번호
 * @returns 인증 성공 시 찾은 아이디가 포함된 응답
 *
 * 주의할 점
 * - 화면 state 이름은 verificationCode처럼 camelCase를 쓰는 편이 읽기 쉽다.
 * - 하지만 서버 명세는 verification_code라는 snake_case를 기대한다.
 * - 따라서 이 함수 안에서만 명세 키 이름으로 변환해 보낸다.
 */
export async function verifyFindIdCode(
  address: string,
  verificationCode: string,
): Promise<FindIdVerifyResponse> {
  const response = await publicAxios.post("/api/auth/find-id", {
    address,
    verification_code: verificationCode,
  });
  return response.data;
}
