import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { BorrowList, BorrowListContextType } from "../../types/BorrowList";

export const ListContext = createContext<BorrowListContextType>({listData: [/*여기 임시 데이터 추가*/], setListData: () => {}, allowData: () => {}});

/*{ children } 구조분해 할당 받고 { children: ReactNode } 구조분해 할당 받은 children이 ReactNode라고 명시 {} 로 둘다 감싼 건 둘다 객체임을 명시*/
export const Provider = ({ children }: { children: ReactNode }) => { 
  const [listData, setListData] = useState<BorrowList[]>([]);

  const allowData = (data: BorrowList) => {
    setListData(prev =>
      prev.map(item =>
        item.registration_number === data.registration_number
          ? { ...item, allow: true }
          : item
      )
    );
  };

  const updateListData = (newData: BorrowList[]) => setListData(newData);

  return(
    <>
      <ListContext value={{listData, allowData, setListData: updateListData}}>{children}</ListContext>
    </>
  )
}

export const useList = () => {
  const context = useContext(ListContext);

  return context;
}