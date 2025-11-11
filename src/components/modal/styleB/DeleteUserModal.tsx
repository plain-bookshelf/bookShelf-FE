import { useState } from "react";
import { BaseModal } from "../baseModal";
import * as S from "./styleB"
import { deleteUser, postLogout } from "../../../api/my";

export default function DeleteUserModal({ onClose }: { onClose: () => void }) {
  const [nextStep, setNextStep] = useState(false);


  const Step1 = ({ onClose }: { onClose: () => void }) => {
  
    return(
      <BaseModal onClose={onClose}>
        <S.Container>
          <S.ModalTitle>회원 탈퇴</S.ModalTitle>
          <S.ModalContent>정말 탈퇴하시겠습니까?</S.ModalContent>
          <S.ButtonBox>
            <S.NoButton onClick={onClose}>이전</S.NoButton>
            <S.YesButton onClick={async () => {
              await deleteUser();
              await postLogout();
              setNextStep(true);
            }}>탈퇴</S.YesButton>
          </S.ButtonBox>
        </S.Container>
      </BaseModal>
    )
  }

  const Step2 = ({ onClose }: { onClose: () => void }) => {

    return(
      <BaseModal onClose={onClose}>
        <S.Container>
          <S.ModalTitle>책마루 회원 탈퇴가 완료되었습니다</S.ModalTitle>
          <S.ModalContent>그 동안 서비스를 이용해 주셔서 감사 드립니다.</S.ModalContent>
          <S.OkButton onClick={() => {
            onClose();
          }}>확인</S.OkButton>
        </S.Container>
      </BaseModal>
    )
  }

  return(
    <>
      {nextStep === false ? <Step1 onClose={onClose} /> : <Step2 onClose={onClose} />}
    </>
  )
}