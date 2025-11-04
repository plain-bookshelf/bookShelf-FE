export type  BorrowList = {
  title: string;
  registerNumber: string;
  userName: string;
  rentalDate: string;
  overdue: boolean;
}

export type BorrowListContextType = {
  listData: BorrowList[];
  setListData: (manageData: BorrowList[]) => void
}