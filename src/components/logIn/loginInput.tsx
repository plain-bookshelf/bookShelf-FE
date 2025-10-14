

import  Header from '../Header';
import * as S from "./style";
import user from '../../assets/user.png';
import lock from '../../assets/lock.png';

export function LogInInPut(){
  return(
    <>
       <Header/>
      <S.LogInContent>
        <S.TextContent>
          <S.LogInText>로그인</S.LogInText>
          <S.LinkContent>
            <S.IdPasswordFind href="">아이디/비밀번호 찾기</S.IdPasswordFind>
            <S.SignUpText href="">회원가입</S.SignUpText>
          </S.LinkContent>
        </S.TextContent>
        <S.InputContent>
          <S.IdInputContent>
              <S.IdInputTextContent>
                <S.IdInputImg src={user}/>
                <S.IdInputText>아이디</S.IdInputText>
              </S.IdInputTextContent>
              <S.IdInput type="search" placeholder="아이디를 입력하세요."/>
          </S.IdInputContent>
          <S.PasswordInputContent>
            <S.PasswordInputTextContent>
              <S.PasswordInputImg src={lock}/>
              <S.PasswordInputText>비밀번호</S.PasswordInputText>
            </S.PasswordInputTextContent>
            <S.PasswordInput type="password" placeholder="비밀번호를 입력하세요."/>
          </S.PasswordInputContent>
          <S.Button>로그인</S.Button>
        </S.InputContent>
      </S.LogInContent>

    </>
  );
}


export default LogInInPut;