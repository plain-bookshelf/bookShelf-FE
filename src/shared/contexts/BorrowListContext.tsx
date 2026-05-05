/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import type { BorrowList, BorrowListContextType } from "../../types/BorrowList";

export const ListContext = createContext<BorrowListContextType>({
  listData: [],
  setListData: () => {},
  allowData: () => {},
});

export const Provider = ({ children }: { children: ReactNode }) => {
  const [listData, setListData] = useState<BorrowList[]>([]);

  const allowData = (data: BorrowList) => {
    setListData((prev) =>
      prev.map((item) =>
        item.registration_number === data.registration_number
          ? { ...item, allow: true }
          : item,
      ),
    );
  };

  return (
    <ListContext.Provider value={{ listData, allowData, setListData }}>
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => useContext(ListContext);



