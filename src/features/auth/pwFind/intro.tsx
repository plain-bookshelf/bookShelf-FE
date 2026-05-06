import * as S from "./introStyle";

interface IntroProps {
  onStart: () => void;
}

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
        <S.Title>비밀번호를 잊으셨나요?</S.Title>
        <S.Description>
          아래로 이동해서 책마루의 비밀번호를 변경할 수 있어요
          {"\n"}
          책마루에 등록된 정보로 이메일을 통해 비밀번호를 찾을 수 있습니다.
        </S.Description>
        <S.NoticeBox>
          <S.NoticeTitle>계정을 찾기 전에 꼭 확인해 주세요!</S.NoticeTitle>
          <S.NoticeText>
            • 기존에 사용하던 계정이 없으시다면 비밀번호를 변경할 수 없으며 회원가입을 해주시길 부탁드립니다
          </S.NoticeText>
        </S.NoticeBox>
        <S.ActionRow type="button" onClick={onStart}>
          <S.ActionText>
            <S.ActionTitle>비밀번호 변경하러 가기</S.ActionTitle>
            <S.ActionDescription>이메일 인증을 통해 비밀번호를 변경합니다.</S.ActionDescription>
          </S.ActionText>
          <S.Arrow>{">"}</S.Arrow>
        </S.ActionRow>
      </S.Card>
    </S.Shell>
  );
}
