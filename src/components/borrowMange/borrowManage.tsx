import * as S from "./style"
import type { BorrowAllow } from "../../types/Manage";
import { useManage } from "../contexts/ManagementContext";

export function CategoryBox() {
  const category = [{title: "책 제목", width: 400}, {title: "등록번호", width: 200}, {title: "유저 이름", width: 160}, {title: "요청날짜", width: 200}, {title: "대출승인", width: 100}] as const;

  return(
    <S.ManageCategoryContainer>
      {category.map((e) => (
        <S.Category width={e.width}>{e.title}</S.Category>
      ))}
    </S.ManageCategoryContainer>
  )
}

export function InfoBox(info: BorrowAllow) {
  const { allowData } = useManage();

  return(
    <S.BorrowInfpContainer>
      <S.Info color="black" weight={600} width={400}>{info.title}</S.Info>
      <S.Info color="#5D5D5D" weight={500} width={200}>{info.registerNumber}</S.Info>
      <S.Info color="black" weight={600} width={160}>{info.userName}</S.Info>
      <S.Info color="#7A7886" weight={500} width={200}>{info.requestDate}</S.Info>
      <S.AllowButtonBox>
        {info.allow ? <S.AllowButton allow={true}>대출승인</S.AllowButton> : <S.AllowButton allow={false} onClick={() => allowData(info)}>대출요청</S.AllowButton>}
      </S.AllowButtonBox>
    </S.BorrowInfpContainer>
  )
}