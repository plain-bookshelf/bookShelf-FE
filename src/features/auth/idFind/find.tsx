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
  const dotCount = isEmail ? 3 : 2;

  return (
    <S.Shell>
      <S.Card>
        <S.Dots>
          <S.Dot $active $wide />
          {Array.from({ length: dotCount - 1 }, (_, index) => (
            <S.Dot key={index} />
          ))}
        </S.Dots>

        <S.Title>아이디 찾기</S.Title>
        <S.Description>
          {isEmail
            ? "이메일을 입력해 주세요"
            : "이메일로 인증번호가 발송되었습니다.\n인증번호를 입력해 주세요."}
        </S.Description>

        <S.Label>{isEmail ? "이메일" : "인증번호"}</S.Label>

        {isEmail ? (
          <S.Input
            id="find-id-email"
            value={email}
            placeholder="email@gmail.com"
            onChange={(event) => onEmailChange(event.target.value)}
          />
        ) : (
          <S.CodeRow>
            <S.Input
              id="find-id-code"
              value={verificationCode}
              placeholder="인증번호를 입력해 주세요"
              onChange={(event) => onVerificationCodeChange(event.target.value)}
            />
            <S.Timer>{timerText}</S.Timer>
            <S.ResendButton type="button" onClick={onReSend}>
              재발급
            </S.ResendButton>
          </S.CodeRow>
        )}

        <S.ErrorText>{error}</S.ErrorText>
        <S.ConfirmButton type="button" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? "확인 중..." : "확인"}
        </S.ConfirmButton>
      </S.Card>
    </S.Shell>
  );
}
