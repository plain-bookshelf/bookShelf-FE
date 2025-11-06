import * as S from "../borrowMange/style"
import type { BorrowList } from "../../types/BorrowList";
import { useList } from "../contexts/BorrowListContext";

export function CategoryBox() {
  const category = [{title: "유저 이름", width: 160}, {title: "책 제목", width: 400}, {title: "등록번호", width: 200}, {title: "대여/연체 날짜", width: 200}, {title: "교납", width: 100}] as const;

  return(
    <S.ManageCategoryContainer>
      {category.map((e) => (
        <S.Category width={e.width}>{e.title}</S.Category>
      ))}
    </S.ManageCategoryContainer>
  )
}

export function InfoBox(info: BorrowList) {
  const { allowData } = useList();

  return(
    <S.BorrowInfpContainer>
      <S.Info color="black" weight={600} width={160}>{info.userName}</S.Info>
      <S.Info color="black" weight={500} width={400}>{info.title}</S.Info>
      <S.Info color="#5D5D5D" weight={600} width={200}>{info.registerNumber}</S.Info>
      <S.overdueInfo overdue={info.overdue} width={200}>{info.overdue === true ? "연체" : info.rentalDate}</S.overdueInfo>
      <S.AllowButtonBox>
        {info.allow ? <S.AllowButton allow={true}>완료</S.AllowButton> : <S.AllowButton allow={false} onClick={() => allowData(info)}>교납</S.AllowButton>}
      </S.AllowButtonBox>
    </S.BorrowInfpContainer>
  )
}