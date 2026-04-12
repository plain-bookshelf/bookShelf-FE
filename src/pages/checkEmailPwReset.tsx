import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendFindPasswordEmail, verifyFindPasswordCode } from "../api/pwReset";
import { Intro } from "../components/auth/pwFind/intro";
import { Find } from "../components/auth/pwFind/find";

const EMAIL_REGEX = /^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z0-9-.]+$/i;

// 비밀번호 찾기는 intro -> 이메일 입력 -> 인증번호 입력의 세 단계를 가진다.
export default function CheckEmailPwReset() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"intro" | "email" | "code">("intro");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(300);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 인증번호 단계에서만 타이머를 유지한다.
    if (step !== "code" || timerSeconds <= 0) return undefined;
    const timer = window.setInterval(() => setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => window.clearInterval(timer);
  }, [step, timerSeconds]);

  const formatTimer = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  const requestCode = async () => {
    // 비밀번호 재설정은 먼저 등록된 이메일인지 확인할 수 있어야 한다.
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("이메일을 입력해주세요");
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
        setError("해당 이메일로 가입한 계정을 찾을 수 없어요.");
      } else {
        setError("인증 메일 전송 중 오류가 발생했어요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    // 인증에 성공하면 다음 비밀번호 변경 화면이 같은 이메일을 참조할 수 있게 전달한다.
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
      const ok = await verifyFindPasswordCode(email.trim(), verificationCode.trim());
      if (!ok) {
        setError("인증번호가 일치하지 않아요. 다시 확인해 주세요.");
        return;
      }
      // 다음 단계에서 메일 주소를 다시 쓰기 때문에 route state로 전달한다.
      navigate("/pwReset", { state: { email: email.trim() } });
    } catch {
      setError("인증에 실패했어요. 인증번호를 확인하고 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "intro") {
    // 첫 진입 시에는 설명 카드만 보여 주고, 실제 입력 흐름은 버튼 클릭 후 시작한다.
    return <Intro onStart={() => setStep("email")} />;
  }

  return (
    <Find
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
      onSubmit={step === "email" ? requestCode : verifyCode}
      onReSend={requestCode}
    />
  );
}
