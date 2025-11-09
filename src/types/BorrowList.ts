export type  BorrowList = {
  book_name: string;
  registration_number: string;
  nick_name: string;
  return_date: string;
  overdue_status: boolean;
  day?: number;
  allow: boolean;
}

export type BorrowListContextType = {
  listData: BorrowList[];
  setListData: (manageData: BorrowList[]) => void;
  allowData: (data: BorrowList) => void;
}

export type CheckBoxProps = {
  checked: boolean;
  onChange: () => void;
};