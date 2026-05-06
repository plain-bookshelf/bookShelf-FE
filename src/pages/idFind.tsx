import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestFindIdCode, verifyFindIdCode } from "../api/idFindApi";
import { Find } from "../features/auth/idFind/find";

const EMAIL_REGEX = /^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z0-9-.]+$/i;

const readApiError = (error: unknown) => {
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
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(300);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (step !== "code" || timerSeconds <= 0) {
      return undefined;
    }

    const timer = window.setInterval(() => setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => window.clearInterval(timer);
  }, [step, timerSeconds]);

  const timerText = useMemo(
    () => `${Math.floor(timerSeconds / 60)}:${(timerSeconds % 60).toString().padStart(2, "0")}`,
    [timerSeconds],
  );

  const handleSendCode = async () => {
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("이메일을 입력해 주세요");
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
        setError("해당 이메일로 가입한 계정을 찾을 수 없어요");
      } else {
        setError(requestError instanceof Error ? requestError.message : "인증번호 전송 중 오류가 발생했어요");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      setError("인증번호를 입력해 주세요");
      return;
    }

    if (timerSeconds <= 0) {
      setError("인증 시간이 만료되었습니다. 인증번호를 다시 요청해 주세요");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await verifyFindIdCode(email.trim(), verificationCode.trim());
      navigate("/showId", { state: { found: response.data } });
    } catch (verifyError: unknown) {
      const { status, code } = readApiError(verifyError);

      if (status === 404 && code === "C003") {
        setError("해당 이메일로 가입한 정보를 찾을 수 없어요");
      } else if (status === 404 && code === "M001") {
        setError("인증번호가 올바르지 않거나 회원 정보가 없어요");
      } else {
        setError(verifyError instanceof Error ? verifyError.message : "인증에 실패했어요");
      }
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
      timerText={timerText}
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
