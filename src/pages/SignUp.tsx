import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification, verifyEmailCode } from "../api/emailRegistrationApi";
import signup from "../api/signup";
import { SignUp } from "../features/auth/signup/signUp";
import type { signupRequest } from "../types/signupTypes";

const ASCII_REGEX = /[^\x20-\x7F]/;
const EMAIL_REGEX = /^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z0-9-.]+$/i;

/**
 * 회원가입 페이지 컨테이너
 *
 * 이 페이지는 4단계 회원가입 흐름의 "상태 관리자"다.
 *
 * 단계 요약
 * 1. 이메일 입력
 * 2. 이메일 인증번호 확인
 * 3. 계정 정보 입력(아이디/비밀번호)
 * 4. 소속 도서관 입력 후 실제 회원가입 요청
 *
 * UI 자체는 SignUp 컴포넌트가 렌더링하고,
 * 이 파일은 각 단계에서 무엇을 검사하고 어떤 API를 부를지 결정한다.
 */
export default function SignUpPage() {
  const navigate = useNavigate();

  /**
   * step
   *
   * 현재 회원가입이 몇 번째 단계에 있는지 나타내는 state다.
   * 화면은 이 값을 보고 "어떤 입력칸을 보여 줄지"를 바꾼다.
   */
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  /**
   * 이메일 입력값
   *
   * 1단계에서 입력받고,
   * 2단계 인증번호 확인과 4단계 최종 가입 요청에서도 계속 사용된다.
   */
  const [email, setEmail] = useState("");

  /**
   * 사용자가 입력한 인증번호
   *
   * 2단계에서만 직접 사용하지만,
   * 확인 버튼을 눌렀을 때 서버 검증 요청의 핵심 값이므로 별도 state로 관리한다.
   */
  const [verificationCode, setVerificationCode] = useState("");

  /**
   * username
   *
   * 최종 회원 계정의 아이디 값이다.
   * 이메일과 별개로 로그인 식별자로 쓰일 수 있어 따로 보관한다.
   */
  const [username, setUsername] = useState("");

  /**
   * password / confirmPassword
   *
   * password는 실제 서버에 보낼 비밀번호,
   * confirmPassword는 사용자가 같은 값을 다시 입력했는지 검사하기 위한 확인용 값이다.
   *
   * 확인용 값은 서버에 직접 보내지 않아도
   * 화면에서 실수 입력을 잡아 주는 데 꼭 필요하다.
   */
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * affiliationName
   *
   * 마지막 단계에서 입력하는 소속 도서관 이름이다.
   * 최종 회원가입 API body에 포함된다.
   */
  const [affiliationName, setAffiliationName] = useState("");

  /**
   * error
   *
   * 각 단계에서 가장 먼저 해결해야 할 문제를 한 줄 문장으로 보여 준다.
   * 예: 이메일 형식 오류, 인증번호 만료, 비밀번호 불일치 등
   */
  const [error, setError] = useState("");

  /**
   * isLoading
   *
   * 메일 발송, 인증번호 확인, 회원가입 요청 중에는 true가 된다.
   * 같은 요청을 여러 번 보내지 않도록 버튼 중복 클릭을 막는 용도다.
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * timerSeconds
   *
   * 인증번호 유효 시간을 초 단위로 저장한다.
   * 300초 = 5분에서 시작해 1초씩 감소한다.
   */
  const [timerSeconds, setTimerSeconds] = useState(300);

  useEffect(() => {
    /**
     * 인증번호 단계(step 2)에서만 타이머를 감소시킨다.
     *
     * step이 2가 아니면 인증번호 화면이 아니라는 뜻이므로
     * 굳이 타이머를 돌릴 필요가 없다.
     */
    if (step !== 2 || timerSeconds <= 0) return undefined;

    const timer = window.setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [step, timerSeconds]);

  /**
   * 초 단위를 MM:SS 형식의 문자열로 바꿔
   * 화면에서 읽기 쉬운 타이머로 보여 준다.
   */
  const formatTimer = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  /**
   * 1단계: 인증 메일 발송
   */
  const requestVerification = async () => {
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("올바른 이메일 형식을 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      /**
       * 아직 회원가입을 완료하는 단계가 아니라,
       * 먼저 이 이메일이 실제로 인증 가능한지 서버에게 메일 발송을 요청한다.
       */
      await sendEmailVerification(email.trim());
      setTimerSeconds(300);
      setStep(2);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "인증 메일 전송에 실패했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 2단계: 인증번호 확인
   */
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
      /**
       * 성공하면 회원가입이 완료되는 것은 아니고,
       * "이 이메일의 소유자가 맞다"는 검증만 끝난 상태가 된다.
       * 그래서 step만 다음 단계로 넘긴다.
       */
      await verifyEmailCode(email.trim(), verificationCode.trim());
      setStep(3);
    } catch (verifyError) {
      setError(verifyError instanceof Error ? verifyError.message : "인증번호 확인에 실패했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 3단계 계정 정보 입력 검사
   *
   * 이 함수는 서버 요청을 보내지 않고,
   * 화면에서 즉시 확인 가능한 규칙만 검사한다.
   *
   * 반환값이 빈 문자열이면 통과,
   * 문자열이 있으면 그 문장을 에러 메시지로 그대로 보여 준다.
   */
  const validateUserInfo = () => {
    if (!username.trim()) return "아이디를 입력해 주세요.";
    if (username.length < 3 || username.length > 16) return "아이디는 3자 이상 16자 이하로 입력해 주세요.";
    if (ASCII_REGEX.test(username)) return "아이디는 영문, 숫자, 일반 특수문자만 사용할 수 있어요.";
    if (!password.trim()) return "비밀번호를 입력해 주세요.";
    if (password.length < 8) return "비밀번호는 8자 이상이어야 해요.";
    if (ASCII_REGEX.test(password)) return "비밀번호는 영문, 숫자, 일반 특수문자만 사용할 수 있어요.";
    if (!confirmPassword.trim()) return "비밀번호 확인을 입력해 주세요.";
    if (password !== confirmPassword) return "비밀번호가 서로 일치하지 않아요.";
    return "";
  };

  /**
   * 4단계: 최종 회원가입 요청
   */
  const submitSignup = async () => {
    if (!affiliationName.trim()) {
      setError("소속 도서관을 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    /**
     * signup API가 요구하는 최종 body 형태로 데이터를 조합한다.
     *
     * 현재 화면에는 닉네임 입력란이 따로 없으므로
     * 백엔드 호환을 위해 username을 nickname 기본값으로 함께 보낸다.
     */
    const requestData: signupRequest = {
      username: username.trim(),
      nickname: username.trim(),
      password,
      address: email.trim(),
      affiliation_name: affiliationName.trim(),
    };

    try {
      await signup(requestData);
      alert("회원가입이 완료되었어요.");
      navigate("/login");
    } catch (signupError) {
      setError(signupError instanceof Error ? signupError.message : "회원가입에 실패했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 확인 버튼 공통 핸들러
   *
   * 화면에는 "확인" 버튼이 하나만 보이지만,
   * step 값에 따라 실제로 수행하는 동작은 달라진다.
   */
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

      /**
       * 3단계 검증이 통과하면 아직 서버 요청은 보내지 않고,
       * 마지막 소속 도서관 입력 화면으로만 이동한다.
       */
      setStep(4);
      return;
    }

    await submitSignup();
  };

  /**
   * 인증번호 재발송
   *
   * 내부적으로는 1단계 메일 발송 로직을 다시 호출한다.
   * 다만 이미 요청 중이면 중복 요청을 막는다.
   */
  const handleReSend = async () => {
    if (isLoading) return;
    await requestVerification();
  };

  return (
    <SignUp
      step={step}
      email={email}
      verificationCode={verificationCode}
      username={username}
      password={password}
      confirmPassword={confirmPassword}
      affiliationName={affiliationName}
      error={error}
      timerText={formatTimer(timerSeconds)}
      isLoading={isLoading}
      /**
       * 각 onChange는 입력값을 갱신하면서
       * 이전 단계의 에러 메시지를 함께 지워 사용자가 다시 시도하기 쉽게 만든다.
       */
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
      onSubmit={handleSubmit}
      onReSend={handleReSend}
    />
  );
}

