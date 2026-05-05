import * as S from "./findStyle";

/**
 * 비밀번호 찾기 이메일/인증 공용 폼 props
 */
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

/**
 * 비밀번호 찾기 폼 카드
 *
 * 아이디 찾기와 구조는 비슷하지만,
 * 문구와 단계 수, 결과 흐름이 비밀번호 재설정용으로 맞춰져 있다.
 */
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
            : "이메일로 인증번호가 발송되었습니다.\n인증번호를 5분 안에 입력해주세요."}
        </S.Description>

        <S.FieldLabel>{isEmail ? "이메일" : "인증번호"}</S.FieldLabel>

        {isEmail ? (
          <S.Input
            id="pw-find-email"
            value={email}
            placeholder="email@gmail.com"
            onChange={(event) => onEmailChange(event.target.value)}
          />
        ) : (
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
        )}

        <S.ErrorText>{error}</S.ErrorText>
        <S.ConfirmButton type="button" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? "확인 중..." : "확인"}
        </S.ConfirmButton>
      </S.NarrowCard>
    </S.Shell>
  );
}
