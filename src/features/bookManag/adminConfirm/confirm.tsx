import { BaseModal } from "../../../shared/modal/baseModal";
import * as S from "./style";

/**
 * 확인 모달 props
 *
 * title / message / confirmLabel은 화면 표시용 문자열이고,
 * onClose / onConfirm은 실제 동작을 상위에서 주입받는다.
 */
interface ConfirmProps {
  title: string;
  message: string;
  confirmLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * 관리자 대여/반납 확인 모달
 *
 * 이 컴포넌트는 단순히 "정말 실행할지" 한 번 더 묻는 UI다.
 * 실제 승인/반납 상태 변경은 상위 페이지가 처리한다.
 */
export default function Confirm({
  title,
  message,
  confirmLabel,
  onClose,
  onConfirm,
}: ConfirmProps) {
  return (
    <BaseModal onClose={onClose}>
      <S.Modal>
        <S.Title>{title}</S.Title>
        <S.Message>{message}</S.Message>
        <S.Actions>
          <S.CancelButton type="button" onClick={onClose}>
            취소
          </S.CancelButton>
          <S.ConfirmButton
            type="button"
            onClick={() => {
              /**
               * 확인 버튼은 먼저 실제 동작을 실행하고,
               * 그 다음 모달을 닫는다.
               *
               * 상위 페이지가 상태를 바꾸는 동안 모달이 먼저 닫혀도 문제는 없지만,
               * 논리 순서상 "확정 -> 닫기"가 더 읽기 쉽다.
               */
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </S.ConfirmButton>
        </S.Actions>
      </S.Modal>
    </BaseModal>
  );
}


