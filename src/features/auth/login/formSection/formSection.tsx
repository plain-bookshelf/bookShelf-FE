import * as S from "./style"
import { type LoginProps } from "../type"
import Input from "../../../../shared/input/input"
import Button from "../../../../shared/button/button"

import google from "../../../../assets/google.svg"

export default function FormSection({
  identifier,
  password,
  error,
  isLoading,
  onIdentifierChange,
  onPasswordChange,
  onSubmit,
  onFindId,
  onFindPassword,
  onSignup,
}: LoginProps) {
  return (
    <>
      <S.FormSection>
        <S.FormInner>
          <S.Title>로그인</S.Title>
          <S.Form
            onSubmit={(event) => {
              event.preventDefault()
              onSubmit()
            }}
          >
            <S.Label>
              아이디
              <Input 
                value={identifier}
                placeholder="아이디 또는 이메일을 입력해주세요"
                onChange={(e) => onIdentifierChange(e.target.value)}
                disabled={isLoading}
                type="text"
                />
            </S.Label>

            <S.Label>
              비밀번호
              <Input 
                value={password}
                placeholder="비밀번호를 입력해주세요"
                onChange={(e) => onPasswordChange(e.target.value)}
                disabled={isLoading}
                type="password"
                />
            </S.Label>

            <Button
              disabled={isLoading}
              type="submit"
              context={isLoading ? "로그인 중..." : "로그인"}
            />
          </S.Form>

          {error && <S.Error>{error}</S.Error>}
          
          <S.LinkRow>
            <S.LinkButton type="button" onClick={onFindId}>
              아이디 찾기
            </S.LinkButton>
            <S.Divider />
            <S.LinkButton type="button" onClick={onFindPassword}>
              비밀번호 찾기
            </S.LinkButton>
            <S.Divider />
            <S.LinkButton type="button" onClick={onSignup}>
              회원가입
            </S.LinkButton>
          </S.LinkRow>
          <S.Bottom>
            <S.Line/>
            <S.BottomText>또는</S.BottomText>
            <S.Line/>
          </S.Bottom>
          <S.SocialRow>
            <S.SocialButton
              type="button"
              $bg="#ffffff"
              aria-label="Google login"
            >
              <S.SocialImage src={google}/>
            </S.SocialButton>
            <S.SocialButton
              type="button"
              $bg="#fddc3f"
              aria-label="Kakao login"
            >
              <S.Kakao />
            </S.SocialButton>
            <S.SocialButton
              type="button"
              $bg="#11c95b"
              aria-label="Naver login"
            >
              <S.Naver>N</S.Naver>
            </S.SocialButton>
          </S.SocialRow>
        </S.FormInner>
      </S.FormSection>
    </>
  )
}
