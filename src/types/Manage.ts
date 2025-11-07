export type  BorrowAllow = {
  title: string;
  registerNumber: string;
  userName: string;
  requestDate: string;
  allow: boolean;
}

export type ManagementContextType = {
  manageData: BorrowAllow[];
  setManageData: (manageData: BorrowAllow[]) => void;
  allowData: (data: BorrowAllow) => void
}