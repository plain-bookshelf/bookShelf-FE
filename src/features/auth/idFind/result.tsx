import * as S from "./resultStyle";

/**
 * 아이디 찾기 결과 화면 props
 *
 * foundId는 상위 페이지가 API 응답에서 넘겨 준 최종 아이디 문자열이고,
 * onConfirm은 사용자가 결과를 확인한 뒤 다음 행동(보통 로그인 화면 이동)을 결정한다.
 */
interface ResultProps {
  foundId: string;
  onConfirm: () => void;
}

/**
 * 아이디 찾기 결과 카드
 *
 * 이 컴포넌트는 값을 계산하지 않는다.
 * 이미 찾은 결과를 읽기 쉬운 카드로 보여 주고,
 * 확인 버튼 클릭 이벤트만 상위로 전달한다.
 */
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
