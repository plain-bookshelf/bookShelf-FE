//import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./style"
import arrow from "../../assets/arrow.png"


export function ShowIdInfo() {
  
   const navigate = useNavigate()
   const location = useLocation()

   const FindId = location.state?.found
    
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
         <S.ShowIdTitle>아이디 찾기</S.ShowIdTitle> 
         <S.ShowIdText>이메일 정보와 일치하는 아이디 입니다</S.ShowIdText>
        </S.ShowIdTitleContent>
        <S.ShowIdInfoContainer>
          <S.ShowIdInfoContent>아이디: {FindId}</S.ShowIdInfoContent>
          <S.NextButton onClick={LoginButton}>확인</S.NextButton>
          <S.PasswordReset to="/checkEmailPwReset">비밀번호 재설정</S.PasswordReset>
        </S.ShowIdInfoContainer>
      </S.ShowIdContent>
    </S.ShowIdContainer>
    </>
  )
}
