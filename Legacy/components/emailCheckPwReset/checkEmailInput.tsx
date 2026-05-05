import { useState } from "react";
import { useNavigate } from "react-router-dom";
import danger from "../../assets/danger.png";
import arrow from "../../assets/arrow.png";
import letter from "../../assets/letter.png";
import { sendFindPasswordEmail, verifyFindPasswordCode } from "../../api/pwReset";
import * as S from "../idFind/style";

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
};

export function CheckEmailInput() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-z0-9+\-_.]+@[a-z0-9-]+\.[a-z0-9-.]+$/i;
    return emailRegex.test(value);
  };

  const handleVerificationRequest = async () => {
    if (!email) return;

    if (!validateEmail(email)) {
      setEmailError(true);
      setVerificationError("");
      setIsVerificationSent(false);
      setIsVerified(false);
      return;
    }

    setEmailError(false);
    setVerificationError("");
    setIsVerified(false);
    setSendLoading(true);

    try {
      await sendFindPasswordEmail(email);
      setIsVerificationSent(true);
      alert("인증번호가 이메일로 전송되었습니다.");
    } catch (error: unknown) {
      const message = getErrorMessage(error);

      if (message === "EMAIL_NOT_FOUND") {
        setEmailError(true);
        setIsVerificationSent(false);
        alert("해당 이메일로 가입된 계정을 찾을 수 없습니다.");
      } else {
        alert("인증 메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setSendLoading(false);
    }
  };

  const handleVerification = async () => {
    if (!verificationCode || !isVerificationSent) return;

    setVerificationError("");
    setVerifyLoading(true);

    try {
      const ok = await verifyFindPasswordCode(email, verificationCode);

      if (ok) {
        setIsVerified(true);
        alert("이메일 인증이 완료되었습니다.");
      } else {
        setIsVerified(false);
        setVerificationError("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
      }
    } catch {
      setIsVerified(false);
      setVerificationError("인증에 실패했습니다. 인증번호를 다시 확인해주세요.");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handlePasswordReset = () => {
    if (!isVerified) {
      alert("이메일 인증을 먼저 완료해주세요.");
      return;
    }

    navigate("/pwReset", {
      state: { username: email },
    });
  };

  return (
    <S.IdFindContainer>
      <S.IdFindContent>
        <S.IdFindTitleContent>
          <S.Arrow src={arrow} onClick={() => navigate("/idPasswordFind")} />
          <S.IdFindTitle>비밀번호 재설정</S.IdFindTitle>
          <S.IdFindText>비밀번호를 찾으려면 이메일을 먼저 인증해주세요.</S.IdFindText>
        </S.IdFindTitleContent>

        <S.IdFindInputContainer>
          <S.EmailInPutContainer>
            <S.EmailInputTextContent>
              <S.EmailInPutImg src={letter} />
              <S.EmailInputText>이메일</S.EmailInputText>
            </S.EmailInputTextContent>

            <S.EmailInputContent>
              <S.EmailInputDiv hasError={emailError}>
                <S.EmailInput
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailError(false);
                    setIsVerificationSent(false);
                    setIsVerified(false);
                    setVerificationError("");
                  }}
                  disabled={isVerificationSent && !emailError}
                />
              </S.EmailInputDiv>

              <S.EmailCheckButton
                disabled={!email || sendLoading || (isVerificationSent && !emailError)}
                onClick={handleVerificationRequest}
              >
                {sendLoading ? "전송 중..." : isVerificationSent ? "전송 완료" : "인증 요청"}
              </S.EmailCheckButton>
            </S.EmailInputContent>
          </S.EmailInPutContainer>

          {emailError && (
            <S.InputError>
              <S.EmailInPutImg src={danger} />
              올바른 이메일을 입력해주세요.
            </S.InputError>
          )}

          <S.CheckInPutContainer>
            <S.CheckInputTextContent>
              <S.CheckInputText>인증번호</S.CheckInputText>
            </S.CheckInputTextContent>

            <S.CheckInputContent>
              <S.CheckInputDiv disabled={!isVerificationSent} hasError={Boolean(verificationError)}>
                <S.CheckInput
                  type="text"
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  onChange={(event) => {
                    setVerificationCode(event.target.value);
                    setVerificationError("");
                    setIsVerified(false);
                  }}
                  disabled={!isVerificationSent || isVerified}
                />
              </S.CheckInputDiv>

              <S.CheckButton
                disabled={!verificationCode || !isVerificationSent || isVerified || verifyLoading}
                onClick={handleVerification}
              >
                {verifyLoading ? "확인 중..." : isVerified ? "인증 완료" : "인증하기"}
              </S.CheckButton>
            </S.CheckInputContent>
          </S.CheckInPutContainer>

          {isVerified && <S.SuccessMessage>이메일 인증이 완료되었습니다.</S.SuccessMessage>}

          {verificationError && (
            <S.ErrorMessage>
              <S.EmailInPutImg src={danger} alt="danger icon" />
              {verificationError}
            </S.ErrorMessage>
          )}

          <S.NextButton onClick={handlePasswordReset}>비밀번호 재설정</S.NextButton>
        </S.IdFindInputContainer>
      </S.IdFindContent>
    </S.IdFindContainer>
  );
}

export default CheckEmailInput;

