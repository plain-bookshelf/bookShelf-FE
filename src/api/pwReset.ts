import { sendEmailCode } from "./emailRegistrationApi";
import { requestWithFallback } from "./publicClient";
import axiosInstance from "./apiClient";

/**
 * pwReset.ts
 *
 * 비밀번호와 관련된 서로 다른 세 가지 흐름을 모아 둔 파일이다.
 *
 * 1. 비로그인 사용자의 "비밀번호 찾기" 이메일 인증
 * 2. 이메일 인증을 마친 뒤 새 비밀번호로 재설정
 * 3. 로그인된 사용자의 "현재 비밀번호 변경"
 *
 * 화면에서는 모두 비슷해 보일 수 있지만,
 * 실제 서버 요청은 인증 방식과 엔드포인트가 서로 다르기 때문에 파일을 분리해 두었다.
 */

interface BaseResponse<T = string | boolean> {
  status: string;
  message: string;
  data: T;
}

/**
 * 비밀번호 찾기용 인증 메일 발송
 *
 * 내부적으로는 공통 이메일 전송 API를 재사용하지만,
 * codeType만 FIND_PASSWORD로 고정해서 의미가 분명한 함수 이름으로 제공한다.
 */
export const sendFindPasswordEmail = async (email: string): Promise<void> => {
  await sendEmailCode(email, "FIND_PASSWORD");
};

/**
 * 비밀번호 찾기용 인증번호 검증
 *
 * @param email 인증번호를 받은 이메일
 * @param verificationCode 사용자가 입력한 인증번호
 * @returns true면 인증 성공
 *
 * 서버 이력 때문에 현재는 두 경로를 모두 시도한다.
 * - /api/find-password: 최신/간단 경로
 * - /api/auth/find-password/verify: 예전 auth 하위 경로
 */
export const verifyFindPasswordCode = async (
  email: string,
  verificationCode: string,
): Promise<boolean> => {
  const res = await requestWithFallback<BaseResponse<boolean>>([
    {
      method: "POST",
      url: "/api/find-password",
      data: { email, verification_code: verificationCode },
      headers: { "Content-Type": "application/json" },
    },
    {
      method: "POST",
      url: "/api/auth/find-password/verify",
      data: { address: email, verification_code: verificationCode },
      headers: { "Content-Type": "application/json" },
    },
  ]);

  if ((res.status === 200 || res.status === 201) && res.data?.data === true) {
    return true;
  }

  /**
   * 이 함수는 페이지에서 boolean 결과를 바로 사용하기 쉽게 만들기 위해
   * 실패 시 false를 돌려주지 않고 예외를 던진다.
   *
   * 이유
   * - false는 "인증 실패"인지 "서버 장애"인지 구분이 어렵다.
   * - Error를 던지면 호출부에서 메시지와 흐름을 분기하기 쉽다.
   */
  throw new Error(res.data?.message ?? "인증번호 확인에 실패했어요.");
};

/**
 * 비밀번호 찾기 이후 새 비밀번호로 재설정
 *
 * @param email 앞 단계 인증이 끝난 이메일
 * @param newPassword 최종적으로 저장할 새 비밀번호
 *
 * 현재 서버 명세에는 오타가 포함된 /password-resest 경로가 존재했던 이력이 있어
 * 올바른 /password-reset과 함께 둘 다 시도한다.
 */
export const resetPasswordByFind = async (email: string, newPassword: string): Promise<void> => {
  const res = await requestWithFallback<BaseResponse>([
    {
      method: "PATCH",
      url: "/api/password-resest",
      data: { email, new_password: newPassword },
      headers: { "Content-Type": "application/json" },
    },
    {
      method: "PATCH",
      url: "/api/password-reset",
      data: { email, new_password: newPassword },
      headers: { "Content-Type": "application/json" },
    },
  ]);

  if (res.status === 200 || res.status === 201) {
    return;
  }

  if (res.status === 404) {
    throw new Error("MEMBER_NOT_FOUND");
  }

  throw new Error(res.data?.message ?? "비밀번호 재설정에 실패했어요.");
};

/**
 * 로그인된 사용자의 비밀번호 변경
 *
 * 비밀번호 찾기와 달리 이 요청은 이미 로그인된 사용자만 사용할 수 있다.
 * 그래서 공개 클라이언트가 아니라 access token 인터셉터가 붙은 axiosInstance를 사용한다.
 *
 * @param existingPassword 현재 비밀번호
 * @param newPassword 새 비밀번호
 */
export const changePassword = async (
  existingPassword: string,
  newPassword: string,
): Promise<void> => {
  const res = await axiosInstance.patch<BaseResponse>(
    "/api/password-change",
    {
      existing_password: existingPassword,
      new_password: newPassword,
    },
    {
      headers: { "Content-Type": "application/json" },
      /**
       * 상태 코드별로 서로 다른 에러 문구를 만들기 위해
       * axios가 자동으로 예외를 던지지 않게 열어 둔다.
       */
      validateStatus: () => true,
    },
  );

  if (res.status === 200) {
    return;
  }

  if (res.status === 400) {
    throw new Error("NOT_MATCH_EXISTING_PASSWORD");
  }

  if (res.status === 404) {
    throw new Error("MEMBER_NOT_FOUND");
  }

  throw new Error(res.data?.message ?? "비밀번호 변경에 실패했어요.");
};
