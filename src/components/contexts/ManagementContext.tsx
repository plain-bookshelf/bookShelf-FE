import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { BorrowAllow, ManagementContextType } from "../../types/Manage";
export const ManagementContext = createContext<ManagementContextType>({manageData: [ /*여기 임시 데이터 추가*/], setManageData: () => {}, allowData: () => {}});

/*{ children } 구조분해 할당 받고 { children: ReactNode } 구조분해 할당 받은 children이 ReactNode라고 명시 {} 로 둘다 감싼 건 둘다 객체임을 명시*/
export const Provider = ({ children }: { children: ReactNode }) => { 
  const [manageData, setManageData] = useState<BorrowAllow[]>([{title: "집", registerNumber: "EM00018181", userName: "ZXO", requestDate: "2025-08-09", allow: true}, {title: "집", registerNumber: "EM00018182", userName: "ZXO", requestDate: "2025-08-09", allow: false}, {title: "집", registerNumber: "EM00018183", userName: "ZXO", requestDate: "2025-08-09", allow: false},{title: "집", registerNumber: "EM00018184", userName: "ZXO", requestDate: "2025-08-09", allow: false}]);
  
  const allowData = (data: BorrowAllow) => {
    setManageData(prev =>
      prev.map(item =>
        item.registerNumber === data.registerNumber
          ? { ...item, allow: true }
          : item
      )
    );
  };

  const updateManageData = (newData: BorrowAllow[]) => setManageData(newData);

  return(
    <>
      <ManagementContext.Provider value={{manageData, allowData ,setManageData: updateManageData}}>{children}</ManagementContext.Provider>
    </>
  )
}

export const useManage = () => {
  const context = useContext(ManagementContext);

  return context;
}