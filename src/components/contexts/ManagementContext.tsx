import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { BorrowAllow, ManagementContextType } from "../../types/Manage";

export const ManagementContext = createContext<ManagementContextType>({manageData: [{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"},{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"},{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"},{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"},{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"},{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"},{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"},{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"},{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"},{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"},{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"},{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"},{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"},{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"},{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"} /*여기 임시 데이터 추가*/], setManageData: () => {}});

/*{ children } 구조분해 할당 받고 { children: ReactNode } 구조분해 할당 받은 children이 ReactNode라고 명시 {} 로 둘다 감싼 건 둘다 객체임을 명시*/
export const Provider = ({ children }: { children: ReactNode }) => { 
  const [manageData, setManageData] = useState<BorrowAllow[]>([{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"}, {title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09"}]);

  const updateManageData = (newData: BorrowAllow[]) => setManageData(newData);

  return(
    <>
      <ManagementContext.Provider value={{manageData, setManageData: updateManageData}}>{children}</ManagementContext.Provider>
    </>
  )
}

export const useManage = () => {
  const {manageData, setManageData} = useContext(ManagementContext);

  /*이거 뭐 책 대여 허락 처리 해야 해서 allowData 이런 식으로 하면 될듯*/
  const allowData = (newData: BorrowAllow[]) => {
    setManageData(newData);
  }

  return {manageData, setManageData, allowData}
}