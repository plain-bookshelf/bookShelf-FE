import { BaseModal } from "../modal/baseModal";
import * as S from "./style";

// 관리자 확인 모달은 "대여"와 "반납" 모두 같은 모달 틀을 재사용하도록 만든다.
interface ConfirmProps {
  title: string;
  message: string;
  confirmLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}

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
              // 실제 상태 변경은 상위 페이지에서 하고, 모달은 확인 신호만 전달한다.
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
