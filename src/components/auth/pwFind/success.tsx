import * as S from "./successStyle";

// 비밀번호 변경 완료 카드는 성공 메시지와 로그인 복귀 버튼만 제공한다.
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
          다시 로그인 해주세요.
        </S.Description>
        <S.ConfirmButton type="button" onClick={onConfirm}>
          확인
        </S.ConfirmButton>
      </S.SmallCard>
    </S.Shell>
  );
}
