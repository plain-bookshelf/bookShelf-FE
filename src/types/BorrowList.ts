export type  BorrowList = {
  title: string;
  registerNumber: string;
  userName: string;
  rentalDate: string;
  overdue: boolean;
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