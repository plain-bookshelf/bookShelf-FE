import { patchBookRetrun } from "../../api/manage";
import checkedImg from "../../assets/checked.png";
import unCheckedImg from "../../assets/unChecked.png";
import type { BorrowList, CheckBoxProps } from "../../types/BorrowList";
import { getDayDiff } from "../../utils/daydiff";
import { useList } from "../contexts/BorrowListContext";
import * as S1 from "../borrowMange/style";
import * as S2 from "./style";

export function CategoryBox() {
  const category = [
    { title: "유저 이름", width: 160 },
    { title: "책 제목", width: 400 },
    { title: "등록번호", width: 200 },
    { title: "대여/연체 날짜", width: 200 },
    { title: "반납", width: 100 },
  ] as const;

  return (
    <S1.ManageCategoryContainer>
      {category.map((item) => (
        <S1.Category key={item.title} width={item.width}>{item.title}</S1.Category>
      ))}
    </S1.ManageCategoryContainer>
  );
}

export function InfoBox(info: BorrowList) {
  const { allowData } = useList();
  const day = getDayDiff(info.return_date);

  const onAllow = async () => {
    allowData(info);

    try {
      await patchBookRetrun(info.registration_number);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S1.BorrowInfpContainer>
      <S1.Info color="black" weight={600} width={160}>{info.nick_name}</S1.Info>
      <S1.Info color="black" weight={500} width={400}>{info.book_name}</S1.Info>
      <S1.Info color="#5D5D5D" weight={600} width={200}>{info.registration_number}</S1.Info>
      <S1.overdueInfo overdue={info.overdue_status} width={200}>
        {info.overdue_status ? "연체" : `대여 ${day}일 남음`}
      </S1.overdueInfo>
      <S1.AllowButtonBox>
        {info.allow ? (
          <S1.AllowButton allow={true}>완료</S1.AllowButton>
        ) : (
          <S1.AllowButton allow={false} onClick={onAllow}>반납</S1.AllowButton>
        )}
      </S1.AllowButtonBox>
    </S1.BorrowInfpContainer>
  );
}

export function CheckBox({ checked, onChange }: CheckBoxProps) {
  return (
    <S2.Container>
      <S2.Box>
        <S2.Text>연체만 보기</S2.Text>
        <S2.HiddenCheckBox checked={checked} onChange={onChange} />
        {checked ? <img src={checkedImg} alt="checked" /> : <img src={unCheckedImg} alt="unchecked" />}
      </S2.Box>
    </S2.Container>
  );
}
