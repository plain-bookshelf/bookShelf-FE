import * as S from "./introStyle";

/**
 * IntroProps
 *
 * 이 컴포넌트는 안내 화면이기 때문에 필요한 동작이 하나뿐이다.
 * 사용자가 "다음 단계로 시작" 버튼을 눌렀을 때 상위 페이지에 알려 주면 된다.
 */
interface IntroProps {
  onStart: () => void;
}

/**
 * 아이디 찾기 소개 카드
 *
 * 실제 입력 UI 전에 먼저 보여 주는 안내 화면이다.
 * 사용자는 여기서 아이디 찾기 방법과 주의사항을 읽고,
 * 버튼을 누르면 상위 페이지가 다음 단계(step)를 변경한다.
 */
export function Intro({ onStart }: IntroProps) {
  return (
    <S.Shell>
      <S.Card>
        <S.Dots>
          <S.Dot $active />
          <S.Dot />
          <S.Dot />
          <S.Dot />
        </S.Dots>
        <S.Title>아이디를 잊으셨나요?</S.Title>
        <S.Description>
          아래로 이동해서 책마루의 아이디를 찾을 수 있어요
          {"\n"}
          책마루에 등록된 정보로 이메일을 통해 아이디를 찾을 수 있습니다.
        </S.Description>
        <S.NoticeBox>
          <S.NoticeTitle>계정을 찾기 전에 꼭 확인해 주세요!</S.NoticeTitle>
          <S.NoticeText>
            • 기존에 사용하던 계정이 없으시다면 아이디 찾을 수 없으며 회원가입을 해주시길 부탁드립니다
          </S.NoticeText>
        </S.NoticeBox>
        <S.ActionRow type="button" onClick={onStart}>
          <S.ActionText>
            <S.ActionTitle>아이디 찾으러 가기</S.ActionTitle>
            <S.ActionDescription>이메일 인증을 통해 계정을 찾습니다.</S.ActionDescription>
          </S.ActionText>
          <S.Arrow>{">"}</S.Arrow>
        </S.ActionRow>
      </S.Card>
    </S.Shell>
  );
}
