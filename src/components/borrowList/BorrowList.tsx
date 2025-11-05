import * as S from "../borrowMange/style"
import type { BorrowList } from "../../types/BorrowList";

export function CategoryBox() {
  const category = [{title: "유저 이름", width: 160}, {title: "책 제목", width: 400}, {title: "등록번호", width: 200}, {title: "대여/연체 날짜", width: 200}, {title: "대출승인", width: 100}] as const;

  return(
    <S.ManageCategoryContainer>
      {category.map((e) => (
        <S.Category width={e.width}>{e.title}</S.Category>
      ))}
    </S.ManageCategoryContainer>
  )
}

export function InfoBox(info: BorrowList) {
  return(
    <S.BorrowInfpContainer>
      <S.Info color="black" weight={600} width={160}>{info.userName}</S.Info>
      <S.Info color="black" weight={500} width={400}>{info.title}</S.Info>
      <S.Info color="#5D5D5D" weight={600} width={200}>{info.registerNumber}</S.Info>
      <S.overdueInfo overdue={info.overdue} width={200}>{info.overdue === true ? "연체" : info.rentalDate}</S.overdueInfo>
      <S.AllowButtonBox>
        <S.AllowButton>교납</S.AllowButton>
      </S.AllowButtonBox>
    </S.BorrowInfpContainer>
  )
}