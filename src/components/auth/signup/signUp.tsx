import * as S from "./style";

type Step = 1 | 2 | 3 | 4;

// 회원가입 UI는 단계에 따라 입력 블록만 바꾸고,
// 실제 단계 전환/검증/요청은 상위 페이지에서 처리한다.
interface SignUpProps {
  step: Step;
  email: string;
  verificationCode: string;
  username: string;
  password: string;
  confirmPassword: string;
  affiliationName: string;
  error: string;
  timerText: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onVerificationCodeChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onAffiliationNameChange: (value: string) => void;
  onSubmit: () => void;
  onReSend: () => void;
}

function getText(step: Step) {
  // 단계별 안내 문구를 한 함수에 모아 두면 화면 구조와 설명을 같이 유지하기 쉽다.
  switch (step) {
    case 1:
      return "이메일 인증을 한 뒤 책과의 만남을 가지세요";
    case 2:
      return "이메일로 인증번호가 발송되었습니다.\n발송된 인증번호를 5분 안에 입력해 주세요.";
    case 3:
      return "아이디와 비밀번호를 입력해 회원 정보를 완성해 주세요.";
    case 4:
      return "현재 자주 이용하시는 도서관을 입력해주세요.\n입력된 도서관으로 추천해드립니다.";
    default:
      return "";
  }
}

export function SignUp({
  step,
  email,
  verificationCode,
  username,
  password,
  confirmPassword,
  affiliationName,
  error,
  timerText,
  isLoading,
  onEmailChange,
  onVerificationCodeChange,
  onUsernameChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onAffiliationNameChange,
  onSubmit,
  onReSend,
}: SignUpProps) {
  return (
    <S.Shell>
      <S.Card>
        <S.Left>
          <S.TopBg />
          <S.BottomBg />
          <S.ImgWrap>
            {/* SVG 느낌을 유지하려고 일러스트 자리를 styled div 조합으로 그렸다. */}
            <S.Platform />
            <S.Books>
              <S.BookBase />
              <S.BookShadow />
              <S.Ribbon />
              <S.Book $left={36} $height={122} $color="#7aaeb1" $accent="#5a8b8e" />
              <S.Book $left={79} $height={132} $color="#f0f1f4" $accent="#d6d9dd" />
              <S.Book $left={122} $height={126} $color="#f7c33f" $accent="#f08e43" />
              <S.Book $left={164} $height={138} $color="#f38d84" $accent="#e95f5d" />
            </S.Books>
            <S.Person>
              <S.Head />
              <S.Body />
              <S.Arm $left={13} $top={19} $rotate={35} />
              <S.Arm $left={34} $top={18} $rotate={-18} />
              <S.Leg $left={18} $rotate={9} />
              <S.Leg $left={30} $rotate={-12} />
            </S.Person>
          </S.ImgWrap>
          <S.Welcome>
            책마루에
            <br />
            오신 것을 환영합니다
          </S.Welcome>
        </S.Left>

        <S.Right>
          <S.Content>
            <S.Dots>
              {/* 현재 단계까지 채워지는 진행 표시다. */}
              {[1, 2, 3, 4].map((dot) => (
                <S.Dot key={dot} $active={dot <= step} $current={dot === step} />
              ))}
            </S.Dots>
            <S.Title>회원가입</S.Title>
            <S.Text>{getText(step)}</S.Text>

            {step === 1 ? (
              <S.Field>
                <S.Label htmlFor="sign-email">이메일</S.Label>
                <S.Input
                  id="sign-email"
                  value={email}
                  placeholder="email@gmail.com"
                  onChange={(event) => onEmailChange(event.target.value)}
                />
              </S.Field>
            ) : null}

            {step === 2 ? (
              <S.Field>
                <S.Label htmlFor="sign-code">인증번호</S.Label>
                <S.CodeRow>
                  <S.Input
                    id="sign-code"
                    value={verificationCode}
                    placeholder="인증번호를 입력해주세요"
                    onChange={(event) => onVerificationCodeChange(event.target.value)}
                  />
                  <S.Timer>{timerText}</S.Timer>
                  <S.ReSend type="button" onClick={onReSend}>
                    재발급
                  </S.ReSend>
                </S.CodeRow>
              </S.Field>
            ) : null}

            {step === 3 ? (
              <>
                <S.Field>
                  <S.Label htmlFor="sign-id">아이디</S.Label>
                  <S.Input
                    id="sign-id"
                    value={username}
                    placeholder="아이디를 입력해주세요"
                    onChange={(event) => onUsernameChange(event.target.value)}
                  />
                </S.Field>
                <S.Field>
                  <S.Label htmlFor="sign-pw">비밀번호</S.Label>
                  <S.Input
                    id="sign-pw"
                    type="password"
                    value={password}
                    placeholder="비밀번호를 입력해주세요"
                    onChange={(event) => onPasswordChange(event.target.value)}
                  />
                </S.Field>
                <S.Field>
                  <S.Label htmlFor="sign-check">비밀번호 확인</S.Label>
                  <S.Input
                    id="sign-check"
                    type="password"
                    value={confirmPassword}
                    placeholder="비밀번호를 다시 입력해주세요"
                    onChange={(event) => onConfirmPasswordChange(event.target.value)}
                  />
                </S.Field>
              </>
            ) : null}

            {step === 4 ? (
              <S.Field>
                <S.Label htmlFor="sign-lib">소속 도서관</S.Label>
                <S.Input
                  id="sign-lib"
                  value={affiliationName}
                  placeholder="소속 도서관을 입력해주세요"
                  onChange={(event) => onAffiliationNameChange(event.target.value)}
                />
              </S.Field>
            ) : null}

            <S.Error>{error}</S.Error>
            <S.Button type="button" onClick={onSubmit} disabled={isLoading}>
              {isLoading ? "처리 중..." : "확인"}
            </S.Button>
          </S.Content>
        </S.Right>
      </S.Card>
    </S.Shell>
  );
}
