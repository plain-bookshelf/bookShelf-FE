import * as S from "./EmailInputStyle";
import letter from "../../assets/letter.png";
import danger from "../../assets/danger.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendEmailVerification, verifyEmailCode } from "../../api/emailRegistrationApi"; 


export function EmailInput() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [verificationError, setVerificationError] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)
  const [nextError, setNextError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-z0-9+-_@.]+@[a-z0-9-]+\.[a-z0-9-.]+$/
    return emailRegex.test(email)
  }

  // 이메일 인증 요청 (POST /email/send)
  const handleVerificationRequest = async () => { 
    if (!email || isRequesting || isVerificationSent) return;

    if (!validateEmail(email)) {
      setEmailError(true)
      return
    }

    setEmailError(false)
    setIsRequesting(true)
    setVerificationError("")

    try {
      const response = await sendEmailVerification(email); 

      setIsVerificationSent(true)
      setVerificationError("")

      alert(`인증 요청 성공: ${response.message}`);
    } catch (error) {
      console.error("인증 요청 실패:", error);
      const errorMessage = error instanceof Error ? error.message : "이메일 전송 중 오류 발생";
      
      setVerificationError(errorMessage);
      setEmailError(true);

      setIsVerificationSent(false);
    } finally {
      setIsRequesting(false)
    }
  }

  const handleNext = () => {
  const trimmedEmail = email.trim()
  setNextError("")

  // 1. 이메일을 아예 안쓴 경우
  if (!trimmedEmail) {
    navigate("/signup")
    return
  }

  // 2. 이메일 형식이 잘못된 경우
  if (!validateEmail(trimmedEmail)) {
    setEmailError(true)
    setNextError("올바른 이메일 형식을 입력해 주세요.")
    return
  }

  // 3. 이메일은 썼는데 인증이 안 된 경우
  if (!isVerified) {
    setNextError("이메일 인증을 완료해야 다음 단계로 이동할 수 있습니다.")
    return
  }

  // 4. 모든 조건 통과 → 회원가입 페이지로 이동
  navigate("/signup", {
    state: {
      emailAddress: trimmedEmail,
      isEmailVerified: true,
    },
  })
}

  // 이메일 인증 확인 (PUT /email/verify)
  const handleVerification = async () => {
    if (!email || !verificationCode || !isVerificationSent || isVerified || isRequesting) return;
    
    setIsRequesting(true);

    try {
      const response = await verifyEmailCode(email, verificationCode);
      
      // API 호출 성공 및 응답 status가 "success"인 경우
      setIsVerified(true);
      setVerificationError("");
      alert(`인증 성공: ${response.message}`);
      // navigate("/signup") // 인증 성공 후 바로 이동하려면 주석 해제

    } catch (error) {
      console.error("인증 확인 실패:", error);
      const errorMessage = error instanceof Error ? error.message : "인증번호 확인 중 오류 발생";
      setVerificationError(errorMessage);
      setIsVerified(false); // 혹시 모를 상황에 대비
      
    } finally {
      setIsRequesting(false);
    }
  }

  
  
 
  return (
    <S.EmailContent>
      <S.TextContainer>
        <S.TextContent>
          <S.EmailTitle>이메일 등록</S.EmailTitle>
          <S.LinkContent>
            <S.IdPasswordFind to="/idPasswordFind">아이디/비밀번호 찾기</S.IdPasswordFind>
            <S.LogInText to="/login">로그인</S.LogInText>
          </S.LinkContent>
        </S.TextContent>
      </S.TextContainer>
      <S.InputContainer>
        <S.EmailInPutContainer>
          <S.EmailInputTextContent>
            <S.EmailInPutImg src={letter}/>
            <S.EmailInputText>이메일</S.EmailInputText>
          </S.EmailInputTextContent>
          <S.EmailInputContent>
            <S.EmailInputDiv hasError={emailError}> 
              <S.EmailInput
                type="email"
                placeholder="이메일을 입력해 주세요"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailError(false)
                  setNextError("")
                }}
                // 인증 요청이 완료되었거나, 인증이 완료되었거나, API 요청 중일 때 비활성화
                disabled={isVerificationSent || isVerified || isRequesting} 
              />
            </S.EmailInputDiv>
            
            <S.EmailCheckButton 
              // 이메일이 없거나, 인증 요청이 완료되었거나, API 요청 중일 때 비활성화
              disabled={!email || isVerificationSent || isVerified || isRequesting} 
              onClick={handleVerificationRequest}>
              {isRequesting && !isVerificationSent ? "요청 중..." : "인증 요청"}
            </S.EmailCheckButton>
          </S.EmailInputContent>
        </S.EmailInPutContainer> 
        {emailError && 
        <S.InputError>
          <img src={danger}/>
          올바른 이메일을 입력하세요
          </S.InputError>}
        
        <S.CheckInPutContainer>
          <S.CheckInputTextContent>
            <S.CheckInputText>인증번호</S.CheckInputText>
          </S.CheckInputTextContent>
          <S.CheckInputContent>
            <S.CheckInputDiv disabled={!isVerificationSent}> 
              <S.CheckInput
                type="text"
                placeholder="인증번호 입력"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value)
                  setVerificationError("")
                  setNextError("")
                }}
                disabled={!isVerificationSent || isVerified || isRequesting}
              />
            </S.CheckInputDiv>
            <S.CheckButton
              // 인증번호가 입력되었고, 인증 요청이 완료되었으며, 아직 인증되지 않았고, API 요청 중이 아닐 때 활성화
              disabled={!verificationCode || !isVerificationSent || isVerified || isRequesting}
              onClick={handleVerification}>
              {isRequesting && isVerificationSent ? "확인 중..." : "인증하기"}
            </S.CheckButton>
          </S.CheckInputContent>
        </S.CheckInPutContainer>
          {verificationError && 
          <S.ErrorMessage>
            <img src={danger} alt="danger icon"/>
            {verificationError || nextError} 
          </S.ErrorMessage>}
        <S.NextButton onClick={handleNext}>다음</S.NextButton>
      </S.InputContainer>
    </S.EmailContent>
  )
}
export default EmailInput