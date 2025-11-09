export type UserInfo = {
  id: string;
  name: string;
  nickName: string;
  email?: string;
  img: string;
}

export type UserContextType = {
  user: UserInfo;
  setUser: (user: UserInfo) => void
}