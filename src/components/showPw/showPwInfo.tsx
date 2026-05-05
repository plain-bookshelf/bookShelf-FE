import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./style"
import arrow from "../../assets/arrow.png"
import lock from "../../assets/lock.png"
import noneSee from "../../assets/noneSee.png"
import see from "../../assets/see.png"

export function ShowPwInfo() {

  const navigate = useNavigate()
  const location = useLocation()

  const resetPassword = location.state?.resetPassword || "비밀번호 정보 없음"
  const [showPw, setShowPw] = useState(false)

  const PreviousButton = () => {
    navigate("/idPasswordFind")
  }

  const LoginButton = () => {
    navigate("/login")
  }



  return(
    <>
      <S.ShowIdContainer>
      <S.ShowIdContent>
        <S.ShowIdTitleContent>
          <S.Arrow src={arrow} onClick={PreviousButton}/>
         <S.ShowIdTitle>비밀번호 재설정</S.ShowIdTitle> 
         <S.ShowTextContent>
          <S.ShowIdText>비밀번호 재설정이 완료되었습니다</S.ShowIdText>
          <S.ShowIdText>다시 로그인 해주세요</S.ShowIdText>
         </S.ShowTextContent>
        </S.ShowIdTitleContent>
        <S.ShowIdInfoContainer> 
          <S.PasswordInputContainer>
            <S.PasswordInputTextContent>
              <S.PasswordInputImg src={lock} alt="lock"/>
              <S.PasswordInputText>새 비밀번호</S.PasswordInputText>
            </S.PasswordInputTextContent>
            <S.PasswordInputContent>
              <S.PasswordInput type={showPw ? "text" : "password"} value={resetPassword} readOnly ></S.PasswordInput>
              <S.SeeButton src={showPw ? see : noneSee} onClick={() => setShowPw(prev => !prev)}/>
            </S.PasswordInputContent>
          </S.PasswordInputContainer>
          <S.NextButton onClick={LoginButton}>확인</S.NextButton>
          <S.PasswordReset to="/passwordReset">비밀번호 재설정</S.PasswordReset>
        </S.ShowIdInfoContainer>
      </S.ShowIdContent>
    </S.ShowIdContainer>
    </>
  )
}