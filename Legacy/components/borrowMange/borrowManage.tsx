import { patchRentalAllow } from "../../api/manage";
import type { BorrowAllow } from "../../types/Manage";
import { useManage } from "../contexts/ManagementContext";
import * as S from "./style";

export function CategoryBox() {
  const category = [
    { title: "책 제목", width: 400 },
    { title: "등록번호", width: 200 },
    { title: "유저 이름", width: 160 },
    { title: "요청 날짜", width: 200 },
    { title: "대여 상태", width: 100 },
  ] as const;

  return (
    <S.ManageCategoryContainer>
      {category.map((item) => (
        <S.Category key={item.title} width={item.width}>
          {item.title}
        </S.Category>
      ))}
    </S.ManageCategoryContainer>
  );
}

export function InfoBox(info: BorrowAllow) {
  const { allowData } = useManage();
  const request = info.request_date.split("T")[0];

  const onAllow = async () => {
    allowData(info);

    try {
      await patchRentalAllow(info.registration_number);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.BorrowInfpContainer>
      <S.Info color="black" weight={600} width={400}>{info.book_name}</S.Info>
      <S.Info color="#5D5D5D" weight={500} width={200}>{info.registration_number}</S.Info>
      <S.Info color="black" weight={600} width={160}>{info.nick_name}</S.Info>
      <S.Info color="#7A7886" weight={500} width={200}>{request}</S.Info>
      <S.AllowButtonBox>
        {info.allow ? (
          <S.AllowButton allow={true}>대여 완료</S.AllowButton>
        ) : (
          <S.AllowButton allow={false} onClick={onAllow}>대여 요청</S.AllowButton>
        )}
      </S.AllowButtonBox>
    </S.BorrowInfpContainer>
  );
}
