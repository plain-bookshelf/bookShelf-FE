import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestFindIdCode, verifyFindIdCode } from "../api/idFindApi";
import { Find } from "../features/auth/idFind/find";

const EMAIL_REGEX = /^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z0-9-.]+$/i;

/**
 * 아이디 찾기 페이지 컨테이너
 *
 * 이 페이지는 아이디 찾기 과정을 두 단계로 나눠 관리한다.
 * 1. 이메일 입력 후 인증번호 발송
 * 2. 인증번호 확인 후 아이디 결과 화면으로 이동
 *
 * 실제 입력창과 카드 UI는 Find 컴포넌트가 담당하고,
 * 이 파일은 상태(useState), API 호출, 타이머, 단계 전환을 담당한다.
 */
const readApiError = (error: unknown) => {
  /**
   * axios 에러 객체는 response 안에 status/data가 들어 있다.
   * 이 헬퍼는 페이지에서 필요한 핵심 값만 뽑아
   * if 문으로 분기하기 쉽게 단순한 객체로 바꿔 준다.
   */
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object"
  ) {
    const response = (error as { response?: { status?: number; data?: { code?: string } } }).response;
    return { status: response?.status, code: response?.data?.code };
  }
  return { status: undefined, code: undefined };
};

export default function IdFind() {
  const navigate = useNavigate();

  /**
   * step
   *
   * 현재 아이디 찾기 흐름이
   * - 이메일 입력 단계인지
   * - 인증번호 입력 단계인지
   * 를 나타낸다.
   */
  const [step, setStep] = useState<"email" | "code">("email");

  /**
   * email
   *
   * 사용자가 입력한 이메일 주소다.
   * 인증번호 발송 요청과 인증번호 검증 요청 모두에서 재사용한다.
   */
  const [email, setEmail] = useState("");

  /**
   * verificationCode
   *
   * 사용자가 메일로 받은 인증번호를 입력한 값이다.
   * code 단계에서만 직접 사용하지만 서버 검증의 핵심 값이라 별도 state로 둔다.
   */
  const [verificationCode, setVerificationCode] = useState("");

  /**
   * timerSeconds
   *
   * 인증번호 만료 시간을 초 단위로 저장한다.
   * 300초(5분)에서 시작해 1초씩 감소한다.
   */
  const [timerSeconds, setTimerSeconds] = useState(300);

  /**
   * error
   *
   * 현재 단계에서 사용자에게 보여 줄 대표 오류 메시지다.
   */
  const [error, setError] = useState("");

  /**
   * isLoading
   *
   * 인증번호 발송/확인 요청이 진행 중인지 표시한다.
   * true일 때는 버튼 중복 클릭을 막을 수 있다.
   */
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    /**
     * 인증번호 입력 단계에서만 타이머를 감소시킨다.
     * 이메일 입력 단계에서는 시간 제한이 아직 의미가 없기 때문이다.
     */
    if (step !== "code" || timerSeconds <= 0) return undefined;

    const timer = window.setInterval(() => setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => window.clearInterval(timer);
  }, [step, timerSeconds]);

  const formatTimer = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  /**
   * 인증번호 발송
   *
   * 성공 시 아이디를 바로 찾는 것이 아니라,
   * 먼저 code 단계로 이동해 사용자가 인증번호를 입력할 수 있게 한다.
   */
  const handleSendCode = async () => {
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("이메일을 입력해주세요");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await requestFindIdCode(email.trim());
      setTimerSeconds(300);
      setStep("code");
    } catch (requestError: unknown) {
      const { status, code } = readApiError(requestError);
      if (status === 404 && code === "C003") {
        setError("해당 이메일로 가입한 계정을 찾을 수 없어요.");
      } else {
        setError(requestError instanceof Error ? requestError.message : "인증번호 전송 중 오류가 발생했어요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 인증번호 확인
   *
   * 성공하면 서버 응답의 data에 찾은 아이디가 들어 있으므로
   * 결과 페이지(showId)로 넘겨 준다.
   */
  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      setError("인증번호를 입력해주세요");
      return;
    }

    if (timerSeconds <= 0) {
      setError("인증 시간이 만료되었어요. 인증번호를 다시 요청해 주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await verifyFindIdCode(email.trim(), verificationCode.trim());

      /**
       * 결과 페이지에서 API를 다시 호출하지 않도록
       * 찾은 아이디를 route state로 함께 넘긴다.
       */
      navigate("/showId", { state: { found: response.data } });
    } catch (verifyError: unknown) {
      const { status, code } = readApiError(verifyError);
      if (status === 404 && code === "C003") setError("해당 이메일로 가입한 정보를 찾을 수 없어요.");
      else if (status === 404 && code === "M001") setError("인증번호가 올바르지 않거나 회원 정보가 없어요.");
      else setError(verifyError instanceof Error ? verifyError.message : "인증에 실패했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Find
      step={step}
      email={email}
      verificationCode={verificationCode}
      error={error}
      timerText={formatTimer(timerSeconds)}
      isLoading={isLoading}
      /**
       * 입력 변경 시 기존 오류를 바로 지워 주면
       * 사용자가 고친 값을 다시 제출할 때 더 자연스럽다.
       */
      onEmailChange={(value) => {
        setEmail(value);
        setError("");
      }}
      onVerificationCodeChange={(value) => {
        setVerificationCode(value);
        setError("");
      }}
      onSubmit={step === "email" ? handleSendCode : handleVerifyCode}
      onReSend={handleSendCode}
    />
  );
}

