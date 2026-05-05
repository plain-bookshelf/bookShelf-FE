import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendFindPasswordEmail, verifyFindPasswordCode } from "../api/pwReset";
import { Intro } from "../features/auth/pwFind/intro";
import { Find } from "../features/auth/pwFind/find";

const EMAIL_REGEX = /^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z0-9-.]+$/i;

/**
 * 비밀번호 찾기 진입 페이지 컨테이너
 *
 * 이 페이지는 비밀번호 재설정 흐름의 앞부분을 담당한다.
 *
 * 단계
 * 1. intro: 안내 카드만 보여 주는 시작 화면
 * 2. email: 이메일 입력 후 인증 메일 요청
 * 3. code: 인증번호 확인 후 실제 비밀번호 재설정 페이지로 이동
 *
 * 실제 새 비밀번호 입력은 /pwReset 페이지에서 이어진다.
 */
export default function CheckEmailPwReset() {
  const navigate = useNavigate();

  /**
   * step
   *
   * 현재 비밀번호 찾기 플로우가 어느 화면에 있는지 나타낸다.
   * 이 값을 기준으로 Intro 또는 Find 컴포넌트를 다르게 렌더링한다.
   */
  const [step, setStep] = useState<"intro" | "email" | "code">("intro");

  /**
   * email
   *
   * 사용자가 입력한 이메일 주소다.
   * 메일 발송 단계와 인증번호 확인 단계 모두에서 필요하다.
   */
  const [email, setEmail] = useState("");

  /**
   * verificationCode
   *
   * 사용자가 메일로 받은 인증번호 입력값이다.
   */
  const [verificationCode, setVerificationCode] = useState("");

  /**
   * timerSeconds
   *
   * 인증번호 만료 시간을 초 단위로 저장한다.
   * code 단계에서만 실제로 감소한다.
   */
  const [timerSeconds, setTimerSeconds] = useState(300);

  /**
   * error
   *
   * 현재 사용자가 먼저 해결해야 할 오류 메시지를 담는다.
   */
  const [error, setError] = useState("");

  /**
   * isLoading
   *
   * 메일 발송 또는 인증번호 확인 요청 중임을 나타낸다.
   * 버튼 연타를 막고 로딩 UI를 보여 줄 때 사용한다.
   */
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (step !== "code" || timerSeconds <= 0) return undefined;

    const timer = window.setInterval(() => setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => window.clearInterval(timer);
  }, [step, timerSeconds]);

  const formatTimer = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  /**
   * 이메일로 인증번호 발송
   *
   * 이 단계는 아직 비밀번호를 바꾸지 않는다.
   * 단지 해당 이메일의 계정에 대해 "비밀번호 재설정 시작"을 요청하는 준비 단계다.
   */
  const requestCode = async () => {
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

  /**
   * 인증번호 확인
   *
   * 성공하면 실제 새 비밀번호를 입력하는 /pwReset 화면으로 이동한다.
   * 그때 필요한 email 값을 route state로 넘긴다.
   */
  const verifyCode = async () => {
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

      /**
       * 다음 화면이 어떤 계정의 비밀번호를 바꿔야 하는지 알아야 하므로
       * 이메일을 route state로 전달한다.
       */
      navigate("/pwReset", { state: { email: email.trim() } });
    } catch {
      setError("인증에 실패했어요. 인증번호를 확인하고 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "intro") {
    /**
     * intro 단계는 입력 폼이 아니라 설명 카드만 보여 주는 화면이다.
     * 사용자가 "시작" 버튼을 눌렀을 때 실제 이메일 입력 단계로 넘어간다.
     */
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

