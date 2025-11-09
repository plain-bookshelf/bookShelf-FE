import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style"
import arrow from "../../assets/arrow.png"
import letter from "../../assets/letter.png"
import danger from "../../assets/danger.png" // 에러 아이콘 추가

export function IdFindInput() {
  
  const navigate = useNavigate()
  
  // EmailInput.tsx에서 가져온 상태와 유사한 상태들
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [verificationError, setVerificationError] = useState("")
  const [emailError, setEmailError] = useState(false)

  // 이메일 유효성 검사 함수
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-z0-9+-_@.]+@[a-z0-9-]+\.[a-z0-9-.]+$/
    return emailRegex.test(email)
  }

  // 인증 요청 핸들러
  const handleVerificationRequest = () => {
    if (email) {
      if (!validateEmail(email)) {
        setEmailError(true)
        setVerificationError("") // 이메일 에러 시 인증번호 에러 초기화
        setIsVerificationSent(false) // 이메일 에러 시 인증 요청 상태 초기화
        return
      }

      setEmailError(false)
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      setGeneratedCode(code)
      setIsVerificationSent(true)
      setVerificationError("") // 인증 요청 시 이전 인증 오류 초기화
      setIsVerified(false) // 재요청 시 인증 완료 상태 초기화

      console.log("생성된 인증번호:", code)
      console.log("인증 요청 이메일:", email)
      alert(`인증번호가 이메일로 전송되었습니다.\n(개발 모드: 콘솔에서 인증번호를 확인하세요)`)
    }
  }

  // 인증 확인 핸들러
  const handleVerification = () => {
    if (verificationCode) {
      if (verificationCode === generatedCode) {
        setIsVerified(true)
        setVerificationError("")
        console.log("인증 성공")
        alert("이메일 인증이 완료되었습니다!")
      } else {
        setVerificationError("인증번호가 일치하지 않습니다. 다시 확인해주세요.")
        setIsVerified(false)
        console.log("인증 실패 - 입력:", verificationCode, "/ 정답:", generatedCode)
      }
    }
  }

  const PreviousButton = () => {
    navigate("/idpasswordfind")
  }
  
  const handleIdFind = () => {
    // 인증 완료 후 아이디 찾기 로직 (예: 서버 요청)
    // 현재는 단순 페이지 이동
    if(isVerified){
      const foundId = "exampleUser123";
      console.log("아이디 찾기 진행")
      navigate("/showId", { state: { foundId } }) 
    } else {
      alert("이메일 인증을 완료해주세요.")
    }
  }

  return(
    <>
      <S.IdFindContainer>
       <S.IdFindContent>
          <S.IdFindTitleContent>
            <S.Arrow src={arrow} onClick={PreviousButton}/>
            <S.IdFindTitle>아이디 찾기</S.IdFindTitle>
            <S.IdFindText>이메일을 인증해주세요</S.IdFindText>
          </S.IdFindTitleContent>
        <S.IdFindInputContainer>
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
                  setIsVerificationSent(false) // 이메일 변경 시 인증 초기화
                  setIsVerified(false)
                  setVerificationError("")
                }}
                disabled={isVerificationSent && !emailError} // 인증 요청 후 이메일 수정 불가 (단, 에러 상태일 때는 입력 가능)
              />
            </S.EmailInputDiv>
            <S.EmailCheckButton 
              disabled={!email || (isVerificationSent && !emailError)} // 이메일이 비어있거나, 인증 요청된 상태(에러 아님)면 비활성화
              onClick={handleVerificationRequest}>
                {isVerificationSent ? "재요청" : "인증 요청"}
            </S.EmailCheckButton>
          </S.EmailInputContent>
        </S.EmailInPutContainer>    
        {emailError && 
        <S.InputError>
          <S.EmailInPutImg src={danger}/>
          올바른 이메일을 입력하세요
        </S.InputError>}
        <S.CheckInPutContainer>
          <S.CheckInputTextContent>
            <S.CheckInputText>인증번호</S.CheckInputText>
          </S.CheckInputTextContent>
          <S.CheckInputContent>
            <S.CheckInputDiv disabled={!isVerificationSent} hasError={!!verificationError}> 
              <S.CheckInput 
                type="text" 
                placeholder="인증번호 입력"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value)
                  setVerificationError("")
                  setIsVerified(false)
                }}
                disabled={!isVerificationSent || isVerified} // 인증 요청이 안됐거나, 이미 인증 성공했으면 비활성화
              />
            </S.CheckInputDiv>
            <S.CheckButton
              disabled={!verificationCode || !isVerificationSent || isVerified} // 인증번호 입력 안됐거나, 인증 요청 안됐거나, 이미 인증 성공했으면 비활성화
              onClick={handleVerification}
            >
              {isVerified ? "인증 완료" : "인증하기"}
            </S.CheckButton>
          </S.CheckInputContent>
        </S.CheckInPutContainer>
        {isVerified && (
          <S.SuccessMessage>
            이메일 인증이 완료되었습니다.
          </S.SuccessMessage>
        )}
        {verificationError && 
          <S.ErrorMessage>
            <S.EmailInPutImg src={danger} alt="danger icon"/>
            {verificationError} 
          </S.ErrorMessage>
        }
        <S.NextButton onClick={handleIdFind}>아이디 찾기</S.NextButton>
        </S.IdFindInputContainer>
        </S.IdFindContent>
      </S.IdFindContainer>
    </>
  )
}