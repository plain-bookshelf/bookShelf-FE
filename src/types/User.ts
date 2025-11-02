export type UserInfo = {
  id: number;
  name: string;
  email?: string;
  img: string;
}

export type UserContextType = {
  user: UserInfo;
  setUser: (user: UserInfo) => void
}