import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestFindIdCode, verifyFindIdCode } from "../api/idFindApi";
import { Find } from "../components/auth/idFind/find";

const EMAIL_REGEX = /^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z0-9-.]+$/i;

const readApiError = (error: unknown) => {
  // axios 에러 응답에서 상태 코드와 서버 에러 코드를 꺼내 화면 메시지로 바꾼다.
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

// 아이디 찾기 페이지는 이메일 입력 단계와 인증번호 입력 단계를 한 컴포넌트에서 전환한다.
export default function IdFind() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(300);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 인증번호 입력 화면으로 넘어간 뒤에만 타이머를 작동시킨다.
    if (step !== "code" || timerSeconds <= 0) return undefined;
    const timer = window.setInterval(() => setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => window.clearInterval(timer);
  }, [step, timerSeconds]);

  const formatTimer = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  const handleSendCode = async () => {
    // 먼저 이메일 형식과 계정 존재 여부를 확인할 수 있게 인증 메일 발송부터 수행한다.
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
      if (status === 404 && code === "C003") setError("해당 이메일로 가입한 계정을 찾을 수 없어요.");
      else setError(requestError instanceof Error ? requestError.message : "인증번호 전송 중 오류가 발생했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    // 인증 성공 시에는 결과 화면에서 그대로 쓸 수 있게 찾은 아이디를 route state로 넘긴다.
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
      // 결과 화면에서 바로 사용할 수 있게 찾은 아이디를 route state로 넘긴다.
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
      // UI 컴포넌트는 현재 상태와 콜백만 받아 순수하게 렌더링한다.
      step={step}
      email={email}
      verificationCode={verificationCode}
      error={error}
      timerText={formatTimer(timerSeconds)}
      isLoading={isLoading}
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
