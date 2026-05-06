import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendFindPasswordEmail, verifyFindPasswordCode } from "../api/pwReset";
import { Intro } from "../features/auth/pwFind/intro";
import { Find } from "../features/auth/pwFind/find";

const EMAIL_REGEX = /^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z0-9-.]+$/i;

export default function CheckEmailPwReset() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"intro" | "email" | "code">("intro");
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

  const requestCode = async () => {
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("이메일을 입력해 주세요");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await sendFindPasswordEmail(email.trim());
      setTimerSeconds(300);
      setStep("code");
    } catch (requestError) {
      if (requestError instanceof Error && requestError.message === "EMAIL_NOT_FOUND") {
        setError("해당 이메일로 가입한 계정을 찾을 수 없어요");
      } else {
        setError("인증 메일 전송 중 오류가 발생했어요");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
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
      const ok = await verifyFindPasswordCode(email.trim(), verificationCode.trim());

      if (!ok) {
        setError("인증번호가 일치하지 않습니다. 다시 확인해 주세요");
        return;
      }

      navigate("/pwReset", { state: { email: email.trim() } });
    } catch {
      setError("인증에 실패했어요. 인증번호를 확인하고 다시 시도해 주세요");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "intro") {
    return <Intro onStart={() => setStep("email")} />;
  }

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
      onSubmit={step === "email" ? requestCode : verifyCode}
      onReSend={requestCode}
    />
  );
}
