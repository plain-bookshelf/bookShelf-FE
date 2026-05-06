import Button from "../../../shared/button/button";
import * as S from "./successStyle";

interface SuccessProps {
  onConfirm: () => void;
}

export function Success({ onConfirm }: SuccessProps) {
  return (
    <S.Shell>
      <S.SmallCard>
        <S.Dots>
          <S.Dot $active $wide />
        </S.Dots>
        <S.Title>비밀번호 변경</S.Title>
        <S.Description>
          비밀번호 재설정이 완료되었습니다.
          {"\n"}
          다시 로그인해 주세요.
        </S.Description>
        <S.ButtonWrap>
          <Button type="button" onClick={onConfirm} disabled={false} context="확인" />
        </S.ButtonWrap>
      </S.SmallCard>
    </S.Shell>
  );
}
