import * as S from "./successStyle";

/**
 * 성공 화면 props
 *
 * 완료 카드에서 필요한 동작은 "확인 후 다음 화면 이동" 하나뿐이다.
 */
interface SuccessProps {
  onConfirm: () => void;
}

/**
 * 비밀번호 재설정 완료 카드
 *
 * 별도 계산 없이 성공 상태만 안내한다.
 * 보통 확인 버튼은 로그인 화면으로 돌아가는 동작과 연결된다.
 */
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
