import * as S from "./findStyle";

// 비밀번호 찾기 입력 화면은 이메일 단계와 인증번호 단계를 한 카드 안에서 전환한다.
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
            ? "이메일을 입력해주세요"
            : "이메일로 인증번호가 발송되었습니다.\n발송된 인증번호를 5분 안에 입력해 주세요."}
        </S.Description>
        {isEmail ? (
          <>
            <S.FieldLabel htmlFor="pw-find-email">이메일</S.FieldLabel>
            <S.Input
              id="pw-find-email"
              value={email}
              placeholder="email@gmail.com"
              onChange={(event) => onEmailChange(event.target.value)}
            />
          </>
        ) : (
          <>
            <S.FieldLabel htmlFor="pw-find-code">인증번호</S.FieldLabel>
            <S.CodeRow>
              <S.Input
                id="pw-find-code"
                value={verificationCode}
                placeholder="인증번호를 입력해주세요"
                onChange={(event) => onVerificationCodeChange(event.target.value)}
              />
              <S.Timer>{timerText}</S.Timer>
              <S.ResendButton type="button" onClick={onReSend}>
                재발급
              </S.ResendButton>
            </S.CodeRow>
          </>
        )}
        <S.ErrorText>{error}</S.ErrorText>
        <S.ConfirmButton type="button" onClick={onSubmit} disabled={isLoading}>
          확인
        </S.ConfirmButton>
      </S.NarrowCard>
    </S.Shell>
  );
}
