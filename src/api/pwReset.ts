import { sendEmailCode } from "./emailRegistrationApi";
import { publicClient } from "./publicClient";
import axiosInstance from "./apiClient";

/**
 * pwReset.ts
 *
 * 비밀번호 관련 API를 모아둔 파일이다.
 * 이 파일은 크게 세 가지 흐름을 담당한다.
 *
 * 1. 비밀번호 찾기용 이메일 인증번호 발송
 * 2. 인증번호 검증 후 registerToken 확보
 * 3. 확보한 registerToken으로 새 비밀번호 설정
 * 4. 로그인 상태에서 기존 비밀번호를 새 비밀번호로 변경
 *
 * 명세서 기준:
 * - find-password: verification api
 * - password-resest: verification api
 * - password-change: member api
 */

interface BaseResponse<T = string | boolean> {
  /**
   * 서버 공통 응답의 비즈니스 상태값.
   * 보통 성공 시 "OK"가 내려온다.
   */
  status: string;

  /**
   * 사용자에게 보여줄 수 있는 설명 메시지.
   */
  message: string;

  /**
   * 실제 payload 영역.
   * API마다 문자열, boolean, 객체, 배열 등 형태가 달라질 수 있다.
   */
  data: T;

  /**
   * 실패 시 서버가 내려주는 상세 에러 코드.
   * 예: VERIFICATION-002, MEMBER-003, MEMBER-005
   */
  code?: string;
}

/**
 * verification 계열 API 기본 경로.
 * - /find-password
 * - /password-resest
 */
const verificationUrl = "/api/verification";

/**
 * member 계열 API 기본 경로.
 * - /password-change
 */
const memberUrl = "/api/member";

/**
 * 인증번호 검증 성공 후 내려오는 registerToken을 세션에 잠시 보관할 키.
 *
 * sessionStorage를 쓰는 이유:
 * - 새로고침 전까지는 유지되게 하고
 * - 브라우저 탭을 닫으면 사라지게 하려는 목적이다.
 *
 * registerToken은 비밀번호 재설정의 1회성 인증 정보에 가까워서
 * localStorage보다 sessionStorage가 더 적합하다.
 */
const PASSWORD_RESET_REGISTER_TOKEN_KEY = "password_reset_register_token";

/**
 * find-password 성공 응답의 data 구조.
 *
 * 명세서 상 register_token이 내려오는데,
 * 실제 서버 구현에 따라 camelCase(registerToken)로 내려올 수 있어
 * 둘 다 읽을 수 있게 열어둔다.
 */
type FindPasswordVerifyData =
  | boolean
  | {
      register_token?: string;
      registerToken?: string;
    }
  | Array<{
      register_token?: string;
      registerToken?: string;
    }>;

/**
 * registerToken을 메모리에도 들고 있고, sessionStorage에도 동기화한다.
 *
 * 메모리 변수만 쓰면:
 * - 인증번호 확인 후
 * - 비밀번호 입력 페이지에서 새로고침하거나
 * - 라우팅 중 모듈 상태가 초기화될 때
 * 값이 사라질 수 있다.
 */
let passwordResetRegisterToken = "";

/**
 * 서버 응답 data에서 registerToken을 읽어내는 함수.
 *
 * 서버 응답이
 * - boolean
 * - 객체 1개
 * - 배열 1개
 * 중 어떤 형태로 오더라도 최대한 안전하게 꺼내기 위해 만들었다.
 */
const readRegisterToken = (data: FindPasswordVerifyData): string => {
  if (typeof data === "boolean") return "";

  if (Array.isArray(data)) {
    const first = data[0];
    return first?.register_token ?? first?.registerToken ?? "";
  }

  return data?.register_token ?? data?.registerToken ?? "";
};

/**
 * registerToken을 sessionStorage에 저장한다.
 */
const persistRegisterToken = (token: string) => {
  passwordResetRegisterToken = token;

  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(PASSWORD_RESET_REGISTER_TOKEN_KEY, token);
  }
};

/**
 * 메모리/세션 어디에 있든 registerToken을 꺼낸다.
 */
const getPersistedRegisterToken = (): string => {
  if (passwordResetRegisterToken) {
    return passwordResetRegisterToken;
  }

  if (typeof window !== "undefined") {
    return window.sessionStorage.getItem(PASSWORD_RESET_REGISTER_TOKEN_KEY) ?? "";
  }

  return "";
};

/**
 * registerToken을 메모리와 sessionStorage에서 모두 제거한다.
 */
const clearRegisterToken = () => {
  passwordResetRegisterToken = "";

  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(PASSWORD_RESET_REGISTER_TOKEN_KEY);
  }
};

/**
 * 비밀번호 찾기용 이메일 인증번호 발송.
 *
 * 실제 발송 API는 emailRegistrationApi.ts의 공통 이메일 발송 함수를 사용하고,
 * codeType만 FIND_PASSWORD로 고정한다.
 */
export const sendFindPasswordEmail = async (email: string): Promise<void> => {
  await sendEmailCode(email, "FIND_PASSWORD");
};

/**
 * 비밀번호 찾기 인증번호 검증.
 *
 * 명세:
 * - POST /find-password
 * - body: { email, verification_code }
 * - success: 200
 * - data 안에 register_token 포함
 *
 * 이 함수의 가장 중요한 역할은
 * "새 비밀번호 설정 단계에서 필요한 registerToken을 확보하는 것"이다.
 */
export const verifyFindPasswordCode = async (
  email: string,
  verificationCode: string,
): Promise<boolean> => {
  const response = await publicClient.post<BaseResponse<FindPasswordVerifyData>>(
    `${verificationUrl}/find-password`,
    {
      email,
      verification_code: verificationCode,
    },
    {
      headers: { "Content-Type": "application/json" },
      validateStatus: () => true,
    },
  );

  if (response.status === 200 && response.data?.status === "OK") {
    const registerToken = readRegisterToken(response.data?.data);

    if (!registerToken) {
      throw new Error("REGISTER_TOKEN_MISSING");
    }

    persistRegisterToken(registerToken);
    return true;
  }

  if (response.status === 400 && response.data?.code === "VERIFICATION-002") {
    throw new Error("NOT_MATCH_VERIFICATION_CODE");
  }

  if (response.status === 400 && response.data?.code === "VERIFICATION-004") {
    throw new Error("NOT_MATCH_EMAIL_MEMBER");
  }

  if (response.status === 404 && response.data?.code === "VERIFICATION-001") {
    throw new Error("EMAIL_NOT_FOUND");
  }

  if (response.status === 404 && response.data?.code === "MEMBER-003") {
    throw new Error("MEMBER_NOT_FOUND");
  }

  throw new Error(response.data?.message ?? "인증번호 확인에 실패했습니다.");
};

/**
 * 비밀번호 찾기 후 새 비밀번호 설정.
 *
 * 명세:
 * - PATCH /password-resest
 * - query: registerToken
 * - body: { email, new_password }
 * - success: 200
 *
 * 주의:
 * 이 API는 반드시 find-password 검증 이후에만 호출할 수 있다.
 * 그래서 registerToken이 없으면 바로 REGISTER_TOKEN_MISSING 오류를 던진다.
 */
export const resetPasswordByFind = async (email: string, newPassword: string): Promise<void> => {
  const registerToken = getPersistedRegisterToken();

  if (!registerToken) {
    throw new Error("REGISTER_TOKEN_MISSING");
  }

  const response = await publicClient.patch<BaseResponse>(
    `${verificationUrl}/password-resest`,
    {
      email,
      new_password: newPassword,
    },
    {
      params: { registerToken },
      headers: { "Content-Type": "application/json" },
      validateStatus: () => true,
    },
  );

  if (response.status === 200 && response.data?.status === "OK") {
    clearRegisterToken();
    return;
  }

  if (response.status === 400 && response.data?.code === "VERIFICATION-002") {
    throw new Error("NOT_MATCH_VERIFICATION_CODE");
  }

  if (response.status === 404 && response.data?.code === "MEMBER-003") {
    throw new Error("MEMBER_NOT_FOUND");
  }

  throw new Error(response.data?.message ?? "비밀번호 재설정에 실패했습니다.");
};

/**
 * 로그인 상태에서 기존 비밀번호를 새 비밀번호로 변경.
 *
 * 명세:
 * - PATCH /password-change
 * - Authorization 헤더 필요
 * - body: { existing_password, new_password }
 * - success: 200
 *
 * axiosInstance는 인증용 인터셉터가 붙어 있어서
 * access token을 자동으로 Authorization 헤더에 실어 보낸다.
 */
export const changePassword = async (
  existingPassword: string,
  newPassword: string,
): Promise<void> => {
  const response = await axiosInstance.patch<BaseResponse>(
    `${memberUrl}/password-change`,
    {
      existing_password: existingPassword,
      new_password: newPassword,
    },
    {
      headers: { "Content-Type": "application/json" },
      validateStatus: () => true,
    },
  );

  if (response.status === 200 && response.data?.status === "OK") {
    return;
  }

  if (response.status === 400 && response.data?.code === "MEMBER-005") {
    throw new Error("NOT_MATCH_EXISTING_PASSWORD");
  }

  if (response.status === 404 && response.data?.code === "MEMBER-003") {
    throw new Error("MEMBER_NOT_FOUND");
  }

  throw new Error(response.data?.message ?? "비밀번호 변경에 실패했습니다.");
};
