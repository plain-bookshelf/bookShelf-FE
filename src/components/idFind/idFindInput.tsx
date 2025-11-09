import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import arrow from "../../assets/arrow.png";
import letter from "../../assets/letter.png";
import danger from "../../assets/danger.png";
import { requestFindIdCode, verifyFindIdCode } from "../../api/idFindApi";

export function IdFindInput() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [foundId, setFoundId] = useState<string | null>(null);

  const [emailError, setEmailError] = useState("");
  const [verificationError, setVerificationError] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-z0-9+_.-]+@[a-z0-9.-]+$/i;
    return emailRegex.test(value);
  };

  // 상단 뒤로가기 버튼
  const PreviousButton = () => {
    navigate("/idPasswordFind");
  };

  // ✅ 인증번호 이메일 전송
  const handleVerificationRequest = async () => {
    setEmailError("");
    setVerificationError("");

    if (!email || !validateEmail(email)) {
      setEmailError("올바른 이메일을 입력하세요.");
      return;
    }

    try {
      setIsSending(true);
      await requestFindIdCode(email);
      setIsVerificationSent(true);
      setIsVerified(false);
      setFoundId(null);
      alert("인증번호가 이메일로 전송되었습니다.");
    } catch (error: any) {
      console.error(error);
      const status = error?.response?.status;
      const code = error?.response?.data?.code;

      if (status === 404 && code === "C003") {
        setEmailError("해당 이메일로 가입된 아이디가 없습니다.");
      } else {
        setVerificationError(
          "인증번호 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    } finally {
      setIsSending(false);
    }
  };

  // 인증번호 검증 + 아이디 조회
  const handleVerification = async () => {
    setVerificationError("");

    if (!email || !validateEmail(email)) {
      setEmailError("올바른 이메일을 입력하세요.");
      return;
    }

    if (!verificationCode) {
      setVerificationError("인증번호를 입력해주세요.");
      return;
    }

    try {
      setIsVerifying(true);
      const res = await verifyFindIdCode(email, verificationCode);

      setIsVerified(true);
      setFoundId(res.data);
      alert("이메일 인증이 완료되었습니다.");
    } catch (error: any) {
      console.error(error);
      setIsVerified(false);
      setFoundId(null);

      const status = error?.response?.status;
      const code = error?.response?.data?.code;

      if (status === 404 && code === "C003") {
        setVerificationError("해당 이메일로 가입된 정보를 찾을 수 없습니다.");
      } else if (status === 404 && code === "M001") {
        setVerificationError(
          "인증번호가 올바르지 않거나 회원정보가 존재하지 않습니다."
        );
      } else {
        setVerificationError("인증에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  // ✅ 아이디 찾기 버튼 → 결과 페이지 이동
  const handleIdFind = () => {
    if (!isVerified || !foundId) {
      alert("이메일 인증을 먼저 완료해주세요.");
      return;
    }

    navigate("/showId", {
      state: {
        found: foundId,
      },
    });
  };

  return (
    <>
      <S.IdFindContainer>
        <S.IdFindContent>
          <S.IdFindTitleContent>
            <S.Arrow src={arrow} onClick={PreviousButton} />
            <S.IdFindTitle>아이디 찾기</S.IdFindTitle>
            <S.IdFindText>이메일을 인증해주세요</S.IdFindText>
          </S.IdFindTitleContent>

          <S.IdFindInputContainer>
            {/* 이메일 입력 */}
            <S.EmailInPutContainer>
              <S.EmailInputTextContent>
                <S.EmailInPutImg src={letter} />
                <S.EmailInputText>이메일</S.EmailInputText>
              </S.EmailInputTextContent>

              <S.EmailInputContent>
                <S.EmailInputDiv hasError={!!emailError}>
                  <S.EmailInput
                    type="email"
                    placeholder="이메일을 입력해 주세요"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                      setIsVerificationSent(false);
                      setIsVerified(false);
                      setVerificationError("");
                      setFoundId(null);
                    }}
                    disabled={isVerificationSent && !emailError}
                  />
                </S.EmailInputDiv>

                <S.EmailCheckButton
                  onClick={handleVerificationRequest}
                  disabled={
                    isSending || !email || !validateEmail(email)
                  }
                >
                  {isVerificationSent ? "재요청" : "인증 요청"}
                </S.EmailCheckButton>
              </S.EmailInputContent>
            </S.EmailInPutContainer>

            {emailError && (
              <S.InputError>
                <S.EmailInPutImg src={danger} />
                {emailError}
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
                  onClick={handleVerification}
                  disabled={
                    !verificationCode ||
                    !isVerificationSent ||
                    isVerified ||
                    isVerifying
                  }
                >
                  {isVerified ? "인증 완료" : "인증하기"}
                </S.CheckButton>
              </S.CheckInputContent>
            </S.CheckInPutContainer>

            {isVerified && !verificationError && (
              <S.SuccessMessage>이메일 인증이 완료되었습니다.</S.SuccessMessage>
            )}

            {verificationError && (
              <S.ErrorMessage>
                <S.EmailInPutImg src={danger} alt="danger icon" />
                {verificationError}
              </S.ErrorMessage>
            )}

            {/* 아이디 찾기 버튼 */}
            <S.NextButton onClick={handleIdFind}>
              아이디 찾기
            </S.NextButton>
          </S.IdFindInputContainer>
        </S.IdFindContent>
      </S.IdFindContainer>
    </>
  );
}