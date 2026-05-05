import * as S from "./style";

type Step = 1 | 2 | 3 | 4;

/**
 * 회원가입 UI 컴포넌트 props
 *
 * 페이지가 이미 useState로 관리 중인 값을 모두 받아서 렌더링만 수행한다.
 * 즉, 이 컴포넌트는 state를 만들지 않고 "현재 단계에 맞는 입력 UI"를 보여 주는 역할에 집중한다.
 */
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

/**
 * 각 단계에서 화면에 보여 줄 제목/설명/버튼 문구를 한곳에 모은다.
 * 이렇게 분리하면 JSX 안에 조건문이 너무 많아지는 것을 막을 수 있다.
 */
function getStepCopy(step: Step) {
  switch (step) {
    case 1:
      return {
        title: "회원가입",
        description: "이메일 인증을 위한 메일 주소를 입력해 주세요.",
        buttonText: "확인",
      };
    case 2:
      return {
        title: "회원가입",
        description: "이메일로 인증번호가 발송되었습니다.\n발송된 인증번호를 5분 안에 입력해 주세요.",
        buttonText: "확인",
      };
    case 3:
      return {
        title: "회원가입",
        description: "아이디와 비밀번호를 입력해 계정 정보를 완성해 주세요.",
        buttonText: "확인",
      };
    case 4:
    default:
      return {
        title: "회원가입",
        description: "현재 자주 이용하시는 도서관을 입력해 주세요.\n입력된 도서관은 회원 정보에 함께 저장됩니다.",
        buttonText: "확인",
      };
  }
}

/**
 * 회원가입 단계형 UI 컴포넌트
 *
 * 왼쪽은 고정 브랜딩/일러스트 영역,
 * 오른쪽은 현재 step에 따라 내용이 바뀌는 폼 영역이다.
 */
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
  const copy = getStepCopy(step);

  return (
    <S.Shell>
      <S.Card>
        {/**
          * 왼쪽 영역은 회원가입 단계가 바뀌어도 거의 고정되는 안내 비주얼이다.
          * 책과 인물을 div 조합으로 그려서 별도 이미지 없이도 유지보수할 수 있게 만들었다.
          */}
        <S.Left>
          <S.TopBg />
          <S.BottomBg />
          <S.ImgWrap>
            <S.Platform />
            <S.Books>
              <S.BookBase />
              <S.BookShadow />
              <S.Ribbon />
              <S.Book $left={36} $height={132} $color="#7baeb4" $accent="#5f8a8f" />
              <S.Book $left={86} $height={152} $color="#f3f3f3" $accent="#d8d8d8" />
              <S.Book $left={136} $height={144} $color="#f0b43f" $accent="#dd9b18" />
              <S.Book $left={186} $height={156} $color="#f08f82" $accent="#df6a5c" />
            </S.Books>
            <S.Person>
              <S.Head />
              <S.Body />
              <S.Arm $left={12} $top={26} $rotate={36} />
              <S.Arm $left={38} $top={26} $rotate={-30} />
              <S.Leg $left={20} $rotate={18} />
              <S.Leg $left={36} $rotate={-8} />
            </S.Person>
          </S.ImgWrap>
          <S.Welcome>책마루에 오신 것을 환영합니다</S.Welcome>
        </S.Left>

        <S.Right>
          <S.Content>
            {/**
              * 점 표시기는 "현재 단계"와 "이전까지 완료한 단계"를 함께 표현한다.
              * dot <= step 조건으로 지금까지 지나온 단계가 모두 초록색으로 보이게 한다.
              */}
            <S.Dots>
              {[1, 2, 3, 4].map((dot) => (
                <S.Dot key={dot} $active={dot <= step} $current={dot === step} />
              ))}
            </S.Dots>

            <S.Title>{copy.title}</S.Title>
            <S.Text>{copy.description}</S.Text>

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
                  placeholder="소속 도서관을 입력해 주세요"
                  onChange={(event) => onAffiliationNameChange(event.target.value)}
                />
              </S.Field>
            ) : null}

            {/**
              * 에러 영역은 빈 문자열일 때도 자리를 유지하게 만들어 두는 편이
              * 버튼 위치가 흔들리지 않아 읽기 편하다.
              */}
            <S.Error>{error}</S.Error>

            <S.Button type="button" onClick={onSubmit} disabled={isLoading}>
              {isLoading ? "로딩 중..." : copy.buttonText}
            </S.Button>
          </S.Content>
        </S.Right>
      </S.Card>
    </S.Shell>
  );
}
