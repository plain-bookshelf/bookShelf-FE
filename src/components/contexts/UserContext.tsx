import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { UserContextType, UserInfo } from "../../types/User";

export const UserContext = createContext<UserContextType>({ user: {name: "ZXO", img:"https://cdn.discordapp.com/attachments/1137618300638072832/1419603738586382356/image.png?ex=68fbe3c2&is=68fa9242&hm=e1fde4255067175861ccfd5dff784d9f8fe667f0badca4b0ab9a369f1c93217a&"}, setUser: () => {} });

/*{ children } 구조분해 할당 받고 { children: ReactNode } 구조분해 할당 받은 children이 ReactNode라고 명시 {} 로 둘다 감싼 건 둘다 객체임을 명시*/
export const Provider = ({ children }: { children: ReactNode }) => { 
  const {user, setUser} = useUser();

  return(
    <>
      <UserContext value={{user, setUser}}>{children}</UserContext>
    </>
  )
}

export const useUser = () => {
  const {user, setUser} = useContext(UserContext);

  /*나중에 유지보수 1순위  | style쪽 0순위*/
  const editUser = (newData: UserInfo) => {
    setUser(newData);
  }

  return {user, setUser, editUser}
}