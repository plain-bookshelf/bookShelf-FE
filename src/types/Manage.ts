export type  BorrowAllow = {
  book_name: string;
  registration_number: string;
  nick_name: string;
  request_date: string;
  allow?: boolean;
}

export type ManagementContextType = {
  manageData: BorrowAllow[];
  setManageData: (manageData: BorrowAllow[]) => void;
  allowData: (data: BorrowAllow) => void
}