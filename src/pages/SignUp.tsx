import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification, verifyEmailCode } from "../api/emailRegistrationApi";
import signup from "../api/signup";
import signupOfficial from "../api/signupOfficial";
import { SignUp } from "../features/auth/signup/signUp";
import type { signupRequest } from "../types/signupTypes";

const ASCII_REGEX = /[^\x20-\x7F]/;
const EMAIL_REGEX = /^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z0-9-.]+$/i;

export default function SignUpPage() {
  const navigate = useNavigate();
  const signupMode = "official" as const;

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [affiliationName, setAffiliationName] = useState("");
  const [officialCode, setOfficialCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300);

  useEffect(() => {
    if (step !== 2 || timerSeconds <= 0) return undefined;

    const timer = window.setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [step, timerSeconds]);

  const formatTimer = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  const requestVerification = async () => {
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("올바른 이메일 형식을 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await sendEmailVerification(email.trim());
      setTimerSeconds(300);
      setStep(2);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "인증 메일 전송에 실패했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!verificationCode.trim()) {
      setError("인증번호를 입력해 주세요.");
      return;
    }

    if (timerSeconds <= 0) {
      setError("인증 시간이 만료되었어요. 인증번호를 다시 요청해 주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await verifyEmailCode(email.trim(), verificationCode.trim());
      setStep(3);
    } catch (verifyError) {
      setError(verifyError instanceof Error ? verifyError.message : "인증번호 확인에 실패했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateUserInfo = () => {
    if (!username.trim()) return "아이디를 입력해 주세요.";
    if (username.length < 3 || username.length > 16) {
      return "아이디는 3자 이상 16자 이하로 입력해 주세요.";
    }
    if (ASCII_REGEX.test(username)) {
      return "아이디는 영문, 숫자, 일반 특수문자만 사용할 수 있어요.";
    }
    if (!password.trim()) return "비밀번호를 입력해 주세요.";
    if (password.length < 8) return "비밀번호는 8자 이상이어야 해요.";
    if (ASCII_REGEX.test(password)) {
      return "비밀번호는 영문, 숫자, 일반 특수문자만 사용할 수 있어요.";
    }
    if (!confirmPassword.trim()) return "비밀번호 확인을 입력해 주세요.";
    if (password !== confirmPassword) return "비밀번호가 서로 일치하지 않아요.";
    return "";
  };

  const submitSignup = async () => {
    if (!affiliationName.trim()) {
      setError("소속 도서관을 입력해 주세요.");
      return;
    }

    if (signupMode === "official" && !officialCode.trim()) {
      setError("관계자 인증코드를 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      if (signupMode === "official") {
        await signupOfficial({
          username: username.trim(),
          password,
          email: email.trim(),
          affiliation_name: affiliationName.trim(),
          verification_code: officialCode.trim(),
        });
      } else {
        const requestData: signupRequest = {
          username: username.trim(),
          nickname: username.trim(),
          password,
          address: email.trim(),
          affiliation_name: affiliationName.trim(),
        };

        await signup(requestData);
      }

      alert("회원가입이 완료되었어요.");
      navigate("/login");
    } catch (signupError) {
      setError(signupError instanceof Error ? signupError.message : "회원가입에 실패했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError("");

    if (step === 1) return requestVerification();
    if (step === 2) return verifyCode();

    if (step === 3) {
      const validationError = validateUserInfo();
      if (validationError) {
        setError(validationError);
        return;
      }

      setStep(4);
      return;
    }

    if (step === 4) {
      if (!affiliationName.trim()) {
        setError("소속 도서관을 입력해 주세요.");
        return;
      }

      if (signupMode === "official") {
        setStep(5);
        return;
      }

      await submitSignup();
      return;
    }

    await submitSignup();
  };

  const handleReSend = async () => {
    if (isLoading) return;
    await requestVerification();
  };

  return (
    <SignUp
      step={step}
      signupMode={signupMode}
      email={email}
      verificationCode={verificationCode}
      username={username}
      password={password}
      confirmPassword={confirmPassword}
      affiliationName={affiliationName}
      officialCode={officialCode}
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
      onUsernameChange={(value) => {
        setUsername(value);
        setError("");
      }}
      onPasswordChange={(value) => {
        setPassword(value);
        setError("");
      }}
      onConfirmPasswordChange={(value) => {
        setConfirmPassword(value);
        setError("");
      }}
      onAffiliationNameChange={(value) => {
        setAffiliationName(value);
        setError("");
      }}
      onOfficialCodeChange={(value) => {
        setOfficialCode(value);
        setError("");
      }}
      onSubmit={handleSubmit}
      onReSend={handleReSend}
    />
  );
}
