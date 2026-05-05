import type React from "react"
import * as S from "./style"
import lock from "../../assets/lock.png"
import user from "../../assets/user.svg"
import see from "../../assets/see.png"
import noneSee from "../../assets/noneSee.png"
import arrow from "../../assets/arrow.png"
import danger from "../../assets/danger.png"
import { useNavigate } from "react-router-dom"


import { useState } from "react"

interface SingupInputProps {
  username: string
  password: string
  affiliation: string
  errors: {
    username: string
    password: string
    confirmPassword: string
  }
  confirmPassword: string
  onUsernameChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onConfirmPasswordChange: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
}

export function SignupInput({
  username,
  password,
  errors,
  confirmPassword,
  affiliation,
  onUsernameChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  isLoading,
}: SingupInputProps) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const PreviousButton = () => {
    navigate("/emailRegistration")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <>
      <S.SingInContent>
        <S.TextContainer>
          <S.TextContent>
            <S.Arrow src={arrow} onClick={PreviousButton} alt="뒤로가기" />
            <S.SingInTitle>회원가입</S.SingInTitle>
            <S.LinkContent>
              <S.IdPasswordFind to="/idPasswordFind">아이디/비밀번호 찾기</S.IdPasswordFind>
              <S.LogInText to="/login">로그인</S.LogInText>
            </S.LinkContent>
          </S.TextContent>
        </S.TextContainer>
        <S.InputContainer as="form" onSubmit={handleSubmit}>
          <S.AffiliationInputContainer>
            <S.AffiliationInputTextContent>
              <S.AffiliationInputImg src={user} />
              <S.AffiliationInputText>소속(고정)</S.AffiliationInputText>
            </S.AffiliationInputTextContent>
            <S.AffiliationInputContent>
              <S.AffiliationInput
                type="text"
                placeholder="소속을 입력하세요"
                value={affiliation}
                onChange={() => {}}
                disabled={isLoading}
                readOnly
              />
            </S.AffiliationInputContent>
          </S.AffiliationInputContainer>
          <S.IdInputContainer>
            <S.IdInputTextContent>
              <S.IdInputImg src={user} />
              <S.IdInputText>아이디</S.IdInputText>
            </S.IdInputTextContent>
            <S.IdInputContent hasError={!!errors.username} hasValue={username.length > 0}>
              <S.IdInput
                type="text"
                placeholder="아이디를 입력해 주세요"
                value={username}
                onChange={(e) => onUsernameChange(e.target.value)}
                disabled={isLoading}
              />
            </S.IdInputContent>
          </S.IdInputContainer>
            {errors.username && (
              <S.ErrorMessageContent>
                <img src={danger} alt="오류" />
                <S.ErrorMessage>{errors.username}</S.ErrorMessage>
              </S.ErrorMessageContent>
            )}
          <S.PasswordInputContainer>
            <S.PasswordInputTextContent>
              <S.PasswordInputImg src={lock} alt="lock icon" />
              <S.PasswordInputText>비밀번호</S.PasswordInputText>
            </S.PasswordInputTextContent>
            <S.PasswordInputContent hasError={!!errors.password} hasValue={password.length > 0}>
              <S.PasswordInput
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                disabled={isLoading}
              />
              {password.length > 0 && (
                <S.SeeButton
                  src={showPassword ? see : noneSee}
                  onClick={togglePasswordVisibility}
                  alt="비밀번호 보기"
                  hasError={!!errors.password}
                  hasValue={password.length > 0}
                />
              )}
            </S.PasswordInputContent>
          </S.PasswordInputContainer>
            {errors.password && (
              <S.ErrorMessageContent>
                <img src={danger} alt="오류" />
                <S.ErrorMessage>{errors.password}</S.ErrorMessage>
              </S.ErrorMessageContent>
            )}
          <S.CheckPasswordInputContainer>
            <S.CheckPasswordInputTextContent>
              <S.PasswordInputImg src={lock} alt="lock icon" />
              <S.CheckPasswordInputText>비밀번호 확인</S.CheckPasswordInputText>
            </S.CheckPasswordInputTextContent>
            <S.CheckPasswordInputContent hasError={!!errors.confirmPassword} hasValue={confirmPassword.length > 0}>
              <S.CheckPasswordInput
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호를 다시 입력해 주세요"
                value={confirmPassword}
                onChange={(e) => onConfirmPasswordChange(e.target.value)}
                disabled={isLoading}
              />
              {confirmPassword.length > 0 && (
                <S.SeeButton
                  src={showConfirmPassword ? see : noneSee}
                  onClick={toggleConfirmPasswordVisibility}
                  alt="비밀번호 확인 보기"
                  hasError={!!errors.confirmPassword}
                  hasValue={confirmPassword.length > 0}
                />
              )}
            </S.CheckPasswordInputContent>
          </S.CheckPasswordInputContainer>
            {errors.confirmPassword && (
              <S.ErrorMessageContent>
                <img src={danger} alt="오류" />
                <S.ErrorMessage>{errors.confirmPassword}</S.ErrorMessage>
              </S.ErrorMessageContent>
            )}
          <S.Button type="submit" disabled={isLoading}>
            {isLoading ? "처리 중..." : "회원가입"}
          </S.Button>
        </S.InputContainer>
      </S.SingInContent>
    </>
  )
}

export default SignupInput