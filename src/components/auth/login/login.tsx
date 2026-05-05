import googleLogo from "../../../assets/gooleLogo.png";
import * as S from "./style";
// import bookImg from "../../../assets/책마루_일러스트_로그인.svg"

// 로그인 UI 컴포넌트는 상위 페이지에서 받은 값과 콜백을 그대로 렌더링만 담당한다.
interface LoginProps {
  identifier: string;
  password: string;
  error: string;
  isLoading: boolean;
  onIdentifierChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  onFindId: () => void;
  onFindPassword: () => void;
  onSignup: () => void;
}

export function Login({
  identifier,
  password,
  error,
  isLoading,
  onIdentifierChange,
  onPasswordChange,
  onSubmit,
  onFindId,
  onFindPassword,
  onSignup
}: LoginProps) {
  return (
    <S.Screen>
      <S.Card>
        <S.HeroSection>
          <S.HeroText>
            <S.HeroTitle>
              마루 AI로
              <br />
              당신의 취향에 맞는
              <br />
              책을 고르세요
            </S.HeroTitle>
          </S.HeroText>
          <S.HeroWave />
          <S.HeroArt>
            {/* 실제 일러스트 이미지는 필요할 때 쉽게 교체할 수 있도록 비워 둔 영역이다. */}
            {/* <img src={bookImg}/> */}
          </S.HeroArt>
        </S.HeroSection>
        <S.FormSection>
          <S.FormInner>
            <S.Title>로그인</S.Title>
            <S.Form
              onSubmit={(event) => {
                // submit 이벤트를 여기서 막아 페이지 로직이 한 곳에서만 실행되게 한다.
                event.preventDefault();
                onSubmit();
              }}
            >
              <S.Label>
                아이디
                <S.Input
                  value={identifier}
                  placeholder="아이디 또는 이메일을 입력해주세요"
                  onChange={(event) => onIdentifierChange(event.target.value)}
                  disabled={isLoading}
                />
              </S.Label>
              <S.Label>
                비밀번호
                <S.Input
                  type="password"
                  value={password}
                  placeholder="비밀번호를 입력해주세요"
                  onChange={(event) => onPasswordChange(event.target.value)}
                  disabled={isLoading}
                />
              </S.Label>
              <S.Button type="submit" disabled={isLoading}>
                {isLoading ? "로그인 중" : "로그인"}
              </S.Button>
            </S.Form>
            <S.Error>{error}</S.Error>
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
            <S.SocialRow>
              <S.SocialButton type="button" $bg="#ffffff" aria-label="Google 로그인">
                <S.SocialImage src={googleLogo} alt="" />
              </S.SocialButton>
              <S.SocialButton type="button" $bg="#ffe100" aria-label="Kakao 로그인">
                <S.Kakao />
              </S.SocialButton>
              <S.SocialButton type="button" $bg="#16c75a" aria-label="Naver 로그인">
                <S.Naver>N</S.Naver>
              </S.SocialButton>
            </S.SocialRow>
          </S.FormInner>
        </S.FormSection>
      </S.Card>
    </S.Screen>
  );
}
