import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { BorrowList, BorrowListContextType } from "../../types/BorrowList";

export const ListContext = createContext<BorrowListContextType>({listData: [/*여기 임시 데이터 추가*/], setListData: () => {}});

/*{ children } 구조분해 할당 받고 { children: ReactNode } 구조분해 할당 받은 children이 ReactNode라고 명시 {} 로 둘다 감싼 건 둘다 객체임을 명시*/
export const Provider = ({ children }: { children: ReactNode }) => { 
  const [listData, setListData] = useState<BorrowList[]>([{title: "죽고 싶은 아이.", registerNumber: "EM00018181", userName: "ZXO", rentalDate: "2025-11-14", overdue: false}]);

  const updateListData = (newData: BorrowList[]) => setListData(newData);

  return(
    <>
      <ListContext value={{listData, setListData: updateListData}}>{children}</ListContext>
    </>
  )
}

export const useList = () => {
  const {listData, setListData} = useContext(ListContext);

  /*이거 뭐 책 대여 허락 처리 해야 해서 allowData 이런 식으로 하면 될듯*/
  const editUser = (newData: BorrowList[]) => {
    setListData(newData);
  }

  return {listData, setListData, editUser}
}