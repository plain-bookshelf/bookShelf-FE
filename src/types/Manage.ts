export type  BorrowAllow = {
  title: string;
  registerNumber: string;
  userName: string;
  requestDate: string;
}

export type ManagementContextType = {
  manageData: BorrowAllow[];
  setManageData: (manageData: BorrowAllow[]) => void
}