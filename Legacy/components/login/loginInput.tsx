import * as S from "./style";
import noneSee from "../../assets/noneSee.png";
import see from "../../assets/see.png";
import { useState } from "react";

interface LoginInputProps {
  identifier: string;
  password: string;
  error: string;
  loginError: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function LoginInput({
  identifier,
  password,
  error,
  loginError,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isLoading,
}: LoginInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <S.LogInContent>
      <S.TextContainer>
        <S.TextContent>
          <S.LogInText>로그인</S.LogInText>
          <S.LinkContent />
        </S.TextContent>
      </S.TextContainer>

      <S.InputArea as="form" onSubmit={handleSubmit}>
        <S.IdInputContainer>
          <S.IdInputText>아이디</S.IdInputText>
          <S.IdInputContent hasError={loginError}>
            <S.IdInput
              type="text"
              placeholder="아이디 또는 이메일을 입력해 주세요"
              value={identifier}
              onChange={(e) => onEmailChange(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
          </S.IdInputContent>
        </S.IdInputContainer>

        <S.PasswordInputContainer>
          <S.PasswordInputText>비밀번호</S.PasswordInputText>
          <S.PasswordInputContent hasError={loginError}>
            <S.PasswordInput
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
            {password.length > 0 && (
              <S.SeeButton
                src={showPassword ? see : noneSee}
                onClick={() => setShowPassword((prev) => !prev)}
                hasError={loginError}
              />
            )}
          </S.PasswordInputContent>
        </S.PasswordInputContainer>

        {error && (
          <S.ErrorMessageContent>
            <S.ErrorMessage>{error}</S.ErrorMessage>
          </S.ErrorMessageContent>
        )}

        <S.Button type="submit" disabled={isLoading}>
          로그인
        </S.Button>
      </S.InputArea>
    </S.LogInContent>
  );
}

export default LoginInput;
