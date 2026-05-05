/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import type { BorrowAllow, ManagementContextType } from "../../types/Manage";

export const ManagementContext = createContext<ManagementContextType>({
  manageData: [],
  setManageData: () => {},
  allowData: () => {},
});

export const Provider = ({ children }: { children: ReactNode }) => {
  const [manageData, setManageData] = useState<BorrowAllow[]>([]);

  const allowData = (data: BorrowAllow) => {
    setManageData((prev) =>
      prev.map((item) =>
        item.registration_number === data.registration_number
          ? { ...item, allow: true }
          : item,
      ),
    );
  };

  return (
    <ManagementContext.Provider value={{ manageData, allowData, setManageData }}>
      {children}
    </ManagementContext.Provider>
  );
};

export const useManage = () => useContext(ManagementContext);



