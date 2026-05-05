import * as S from "./findStyle";

/**
 * 아이디 찾기 입력/인증 공용 컴포넌트 props
 *
 * step에 따라 이메일 입력 화면과 인증번호 입력 화면을 같은 카드 안에서 전환한다.
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
 * 아이디 찾기 폼 카드
 *
 * 특징
 * - 내부 state는 없고 상위 페이지가 준 값만 보여 준다.
 * - step이 email이면 메일 주소 입력 UI를,
 *   code면 인증번호 입력 UI를 렌더링한다.
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
  /**
   * isEmail은 JSX 안의 조건문을 더 읽기 쉽게 만들기 위한 파생값이다.
   * step === "email"을 여러 번 반복하지 않게 해 준다.
   */
  const isEmail = step === "email";

  /**
   * 진행 점 개수는 화면 디자인에 맞춰 단계별로 다르게 보이게 한다.
   * 이메일 단계는 아직 더 많은 단계를 남겨 둔 느낌을 주고,
   * 인증번호 단계는 더 적은 점으로 진척도를 표현한다.
   */
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
            ? "이메일을 입력해주세요"
            : "이메일로 인증번호가 발송되었습니다.\n인증번호를 입력해주세요."}
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
              placeholder="인증번호를 입력해주세요"
              onChange={(event) => onVerificationCodeChange(event.target.value)}
            />
            {/** timerText는 이미 페이지에서 MM:SS 형태로 가공된 문자열이다. */}
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
