/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { UserContextType, UserInfo } from "../../types/User";
import { getUserId } from "../../utils/tokenService";

const emptyUser: UserInfo = {
  id: "",
  name: "",
  nickName: "",
  img: "",
  email: "",
};

export const UserContext = createContext<UserContextType>({
  user: emptyUser,
  setUser: () => {},
});

export const Provider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo>(emptyUser);

  useEffect(() => {
    const storedId = getUserId();
    if (!storedId) {
      return;
    }

    setUser((prev) => ({ ...prev, id: storedId }));
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);



