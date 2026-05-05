import type {
  ApiResponse,
  EmailSendRequest,
  EmailVerifyRequest,
  EmailVerifyResponse,
  VerificationCodeType,
} from "../types/emailTypes";
import { requestWithFallback } from "./publicClient";

/**
 * emailRegistrationApi.ts
 *
 * 이메일 인증과 관련된 API를 모아 둔 파일이다.
 *
 * 이 파일의 책임
 * 1. 이메일로 인증번호를 보내 달라고 요청한다.
 * 2. 사용자가 입력한 인증번호가 맞는지 확인한다.
 *
 * 회원가입, 이메일 기반 아이디 찾기, 비밀번호 찾기 등에서
 * "메일을 보내고 인증번호를 검사한다"는 공통 흐름을 재사용하기 위해 분리했다.
 */

/**
 * 현재 명세상 이메일 발송은 /api/email/send 한 경로를 사용한다.
 * 배열로 유지하는 이유는 추후 경로가 늘어나더라도 requestWithFallback 구조를 그대로 재사용하기 위해서다.
 */
const EMAIL_SEND_CANDIDATES = ["/api/email/send"];
const EMAIL_VERIFY_CANDIDATES = ["/api/email/verify"];

/**
 * 서버가 message를 내려 주면 그 값을 우선 사용하고,
 * 없으면 호출 상황에 맞는 기본 문구를 사용한다.
 *
 * 이렇게 해 두면 UI는 복잡한 응답 형태를 몰라도
 * 항상 "보여 줄 문장 한 줄"만 받아서 처리할 수 있다.
 */
const readErrorMessage = (fallback: string, payload?: { message?: string }) =>
  payload?.message ?? fallback;

/**
 * 인증 메일 발송 공통 함수
 *
 * @param email 사용자에게 인증번호를 보낼 이메일 주소
 * @param codeType 어떤 용도의 인증인지 구분하는 서버 파라미터
 *        예: 회원가입용, 비밀번호 찾기용
 *
 * 이 함수는 "이메일을 보낸다"는 공통 행위를 담당하고,
 * 각 페이지는 codeType만 바꿔 같은 로직을 재사용한다.
 */
export async function sendEmailCode(
  email: string,
  codeType: VerificationCodeType,
): Promise<ApiResponse> {
  /**
   * 서버는 body에 email을 받고,
   * codeType은 query parameter로 구분한다.
   */
  const body: EmailSendRequest = { email };

  const res = await requestWithFallback<ApiResponse>(
    EMAIL_SEND_CANDIDATES.map((url) => ({
      method: "POST",
      url,
      params: { codeType },
      data: body,
      headers: { "Content-Type": "application/json" },
    })),
  );

  /**
   * 이메일 전송 API는 data 내부 payload보다도
   * status/message 같은 공통 응답 형식을 성공 기준으로 보는 편이 안전하다.
   */
  if ((res.status === 200 || res.status === 201) && res.data?.status) {
    return res.data;
  }

  throw new Error(readErrorMessage("이메일 전송에 실패했어요.", res.data as { message?: string }));
}

/**
 * 회원가입 화면에서 자주 쓰는 전용 래퍼 함수
 *
 * sendEmailCode에 직접 문자열을 넘겨도 되지만,
 * 페이지 입장에서는 "회원가입용 이메일 인증"이라는 의미가 더 중요하므로
 * 별도 이름으로 한 번 감싸 가독성을 높였다.
 */
export async function sendEmailVerification(email: string): Promise<ApiResponse> {
  return sendEmailCode(email, "VERIFICATION_EMAIL");
}

/**
 * 인증번호 확인 요청
 *
 * @param email 인증번호를 받은 이메일
 * @param verificationCode 사용자가 입력한 6자리 등의 코드
 *
 * 서버 명세는 verification_code라는 snake_case 키를 사용하므로
 * 화면 state 이름과 다르더라도 여기서 명세 형태로 바꿔 보낸다.
 */
export async function verifyEmailCode(
  email: string,
  verificationCode: string,
): Promise<EmailVerifyResponse> {
  const body: EmailVerifyRequest = { email, verification_code: verificationCode };

  const res = await requestWithFallback<EmailVerifyResponse>(
    EMAIL_VERIFY_CANDIDATES.map((url) => ({
      method: "POST",
      url,
      data: body,
      headers: { "Content-Type": "application/json" },
    })),
  );

  if ((res.status === 200 || res.status === 201) && res.data?.status) {
    return res.data;
  }

  throw new Error(readErrorMessage("인증번호 확인에 실패했어요.", res.data as { message?: string }));
}

