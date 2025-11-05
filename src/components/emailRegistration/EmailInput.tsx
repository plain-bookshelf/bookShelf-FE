import * as S from "./EmailInputStyle";
import letter from "../../assets/letter.png";
import danger from "../../assets/danger.png";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function EmailInput() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [verificationError, setVerificationError] = useState("")
  const [emailError, setEmailError] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-z0-9+-_@.]+@[a-z0-9-]+\.[a-z0-9-.]+$/
    return emailRegex.test(email)
  }

  const handleVerificationRequest = () => {
    if (email) {
      if (!validateEmail(email)) {
        setEmailError(true)
        return
      }

      setEmailError(false)
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      setGeneratedCode(code)
      setIsVerificationSent(true)
      setVerificationError("") // 인증 요청 시 이전 인증 오류 초기화

      console.log("생성된 인증번호:", code)
      console.log("인증 요청 이메일:", email)
      alert(`인증번호가 이메일로 전송되었습니다.\n(개발 모드: 콘솔에서 인증번호를 확인하세요)`)
    }
  }

  const handleVerification = () => {
    if (verificationCode) {
      if (verificationCode === generatedCode) {
        setIsVerified(true)
        setVerificationError("")
        console.log("인증 성공")
        alert("이메일 인증이 완료되었습니다!")
        navigate("/signup")
      } else {
        setVerificationError("인증번호가 일치하지 않습니다. 다시 확인해주세요.")
        console.log("인증 실패 - 입력:", verificationCode, "/ 정답:", generatedCode)
      }
    }
  }

  const handleNext = () => {
    navigate("/signup")
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
                }}
                disabled={isVerificationSent}
              />
            </S.EmailInputDiv>
            
            <S.EmailCheckButton disabled={!email || isVerificationSent} onClick={handleVerificationRequest}>
              인증 요청
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
                }}
                disabled={!isVerificationSent || isVerified}
              />
            </S.CheckInputDiv>
            <S.CheckButton
              disabled={!verificationCode || !isVerificationSent || isVerified}
              onClick={handleVerification}>
              인증하기
            </S.CheckButton>
          </S.CheckInputContent>
        </S.CheckInPutContainer>
          {verificationError && 
          <S.ErrorMessage>
            <img src={danger} alt="danger icon"/>
            {verificationError} 
          </S.ErrorMessage>}

        <S.NextButton onClick={handleNext}>다음</S.NextButton>
      </S.InputContainer>
    </S.EmailContent>
  )
}

export default EmailInput;