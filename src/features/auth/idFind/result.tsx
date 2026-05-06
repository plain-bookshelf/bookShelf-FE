import * as S from "./resultStyle";

interface ResultProps {
  foundId: string;
  onConfirm: () => void;
}

export function Result({ foundId, onConfirm }: ResultProps) {
  return (
    <S.Shell>
      <S.Card>
        <S.Dots>
          <S.Dot $active $wide />
        </S.Dots>
        <S.Title>아이디 찾기</S.Title>
        <S.Description>이메일 정보와 일치하는 아이디입니다.</S.Description>
        <S.ResultBox>아이디 : {foundId}</S.ResultBox>
        <S.ConfirmButton type="button" onClick={onConfirm}>
          확인
        </S.ConfirmButton>
      </S.Card>
    </S.Shell>
  );
}
