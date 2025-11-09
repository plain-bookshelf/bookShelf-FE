import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../idFind/style";
import arrow from "../../assets/arrow.png";
import letter from "../../assets/letter.png";
import danger from "../../assets/danger.png";
import {
  sendFindPasswordEmail,
  verifyFindPasswordCode,
} from "../../api/pwReset"; // ✅ 비번찾기 API 유틸 임포트

export function CheckEmailInput() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [isVerificationSent, setIsVerificationSent] = useState(false); // 이메일 전송 성공 여부
  const [isVerified, setIsVerified] = useState(false);                 // 인증 완료 여부

  const [emailError, setEmailError] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  const [sendLoading, setSendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  // 이메일 유효성 검사
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-z0-9+-_@.]+@[a-z0-9-]+\.[a-z0-9-.]+$/;
    return emailRegex.test(email);
  };

  // 🔐 인증 메일 전송 요청 (POST /api/auth/find-password/send)
  const handleVerificationRequest = async () => {
    if (!email) return;

    // 1) 형식 체크
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
      await sendFindPasswordEmail(email); // ✅ 실제 API 호출

      setIsVerificationSent(true);
      alert("인증번호가 이메일로 전송되었습니다.");
    } catch (err: any) {
      console.error("인증 메일 전송 실패:", err);

      if (err instanceof Error && err.message === "EMAIL_NOT_FOUND") {
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

  // ✅ 인증번호 확인 (POST /api/auth/find-password/verify)
  const handleVerification = async () => {
    if (!verificationCode || !isVerificationSent) return;

    setVerificationError("");
    setVerifyLoading(true);

    try {
      const ok = await verifyFindPasswordCode(email, verificationCode); // ✅ 실제 API 호출

      if (ok) {
        setIsVerified(true);
        alert("이메일 인증이 완료되었습니다!");
      } else {
        setIsVerified(false);
        setVerificationError("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
      }
    } catch (err: any) {
      console.error("인증 실패:", err);
      setIsVerified(false);
      setVerificationError("인증에 실패했습니다. 인증번호를 확인 후 다시 시도해주세요.");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handlePrevious = () => {
    navigate("/idPasswordFind");
  };

  // 🔁 다음 단계: PwReset 페이지로 이동 (email을 state로 전달)
  const handlePasswordReset = () => {
    if (!isVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    // ✅ PwReset에서 location.state.username 또는 email 로 사용
    navigate("/pwReset", {
      state: { username: email },
    });
  };

  return (
    <S.IdFindContainer>
      <S.IdFindContent>
        <S.IdFindTitleContent>
          <S.Arrow src={arrow} onClick={handlePrevious} />
          <S.IdFindTitle>비밀번호 재설정</S.IdFindTitle>
          <S.IdFindText>비밀번호를 잊으셨나요? 이메일을 인증해 주세요</S.IdFindText>
        </S.IdFindTitleContent>

        <S.IdFindInputContainer>
          {/* 이메일 입력 */}
          <S.EmailInPutContainer>
            <S.EmailInputTextContent>
              <S.EmailInPutImg src={letter} />
              <S.EmailInputText>이메일</S.EmailInputText>
            </S.EmailInputTextContent>

            <S.EmailInputContent>
              <S.EmailInputDiv hasError={emailError}>
                <S.EmailInput
                  type="email"
                  placeholder="이메일을 입력해 주세요"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                    setIsVerificationSent(false);
                    setIsVerified(false);
                    setVerificationError("");
                  }}
                  // 전송 성공 후에는 이메일 잠그기 (재전송 설계에 따라 조정 가능)
                  disabled={isVerificationSent && !emailError}
                />
              </S.EmailInputDiv>

              <S.EmailCheckButton
                disabled={
                  !email ||
                  sendLoading ||
                  (isVerificationSent && !emailError)
                }
                onClick={handleVerificationRequest}>
                {sendLoading
                  ? "전송 중..."
                  : isVerificationSent
                  ? "전송 완료"
                  : "인증 요청"}
              </S.EmailCheckButton>
            </S.EmailInputContent>
          </S.EmailInPutContainer>

          {emailError && (
            <S.InputError>
              <S.EmailInPutImg src={danger} />
              올바른 이메일을 입력하세요.
            </S.InputError>
          )}

          {/* 인증번호 입력 */}
          <S.CheckInPutContainer>
            <S.CheckInputTextContent>
              <S.CheckInputText>인증번호</S.CheckInputText>
            </S.CheckInputTextContent>

            <S.CheckInputContent>
              <S.CheckInputDiv
                disabled={!isVerificationSent}
                hasError={!!verificationError}
              >
                <S.CheckInput
                  type="text"
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                    setVerificationError("");
                    setIsVerified(false);
                  }}
                  disabled={!isVerificationSent || isVerified}
                />
              </S.CheckInputDiv>

              <S.CheckButton
                disabled={
                  !verificationCode ||
                  !isVerificationSent ||
                  isVerified ||
                  verifyLoading
                }
                onClick={handleVerification}
              >
                {verifyLoading
                  ? "확인 중..."
                  : isVerified
                  ? "인증 완료"
                  : "인증하기"}
              </S.CheckButton>
            </S.CheckInputContent>
          </S.CheckInPutContainer>

          {isVerified && (
            <S.SuccessMessage>이메일 인증이 완료되었습니다.</S.SuccessMessage>
          )}

          {verificationError && (
            <S.ErrorMessage>
              <S.EmailInPutImg src={danger} alt="danger icon" />
              {verificationError}
            </S.ErrorMessage>
          )}

          {/* 다음 버튼 */}
          <S.NextButton onClick={handlePasswordReset}>
            비밀번호 재설정
          </S.NextButton>
        </S.IdFindInputContainer>
      </S.IdFindContent>
    </S.IdFindContainer>
  );
}

export default CheckEmailInput;