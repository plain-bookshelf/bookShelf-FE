import Button from "../../../shared/button/button";
import Input from "../../../shared/input/input";
import * as S from "./findStyle";

interface FindProps {
  step: "email" | "code";
  email: string;
  verificationCode: string;
  error: string;
  timerText: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onVerificationCodeChange: (value: string) => void;
  onSubmit: () => void;
  onReSend: () => void;
}

export function Find({
  step,
  email,
  verificationCode,
  error,
  timerText,
  isLoading,
  onEmailChange,
  onVerificationCodeChange,
  onSubmit,
  onReSend,
}: FindProps) {
  const isEmail = step === "email";

  return (
    <S.Shell>
      <S.NarrowCard>
        <S.Dots>
          <S.Dot $active $wide />
          <S.Dot />
          <S.Dot />
        </S.Dots>

        <S.Title>비밀번호 변경</S.Title>
        <S.Description>
          {isEmail
            ? "이메일을 입력해 주세요."
            : "이메일로 인증번호가 발송되었습니다.\n발송된 인증번호를 5분 이내에 입력해 주세요."}
        </S.Description>

        <S.FieldLabel>{isEmail ? "이메일" : "인증번호"}</S.FieldLabel>

        {isEmail ? (
          <Input
            type="text"
            value={email}
            placeholder="email@gmail.com"
            onChange={(event) => onEmailChange(event.target.value)}
          />
        ) : (
          <S.CodeRow>
            <S.CodeInputWrap>
              <Input
                type="text"
                value={verificationCode}
                placeholder="인증번호를 입력해 주세요"
                onChange={(event) => onVerificationCodeChange(event.target.value)}
              />
              <S.Timer>{timerText}</S.Timer>
            </S.CodeInputWrap>
            <S.ResendButton type="button" onClick={onReSend}>
              재발급
            </S.ResendButton>
          </S.CodeRow>
        )}

        <S.ErrorText>{error}</S.ErrorText>

        <S.ButtonWrap>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isLoading}
            context={isLoading ? "확인 중..." : "확인"}
          />
        </S.ButtonWrap>
      </S.NarrowCard>
    </S.Shell>
  );
}
