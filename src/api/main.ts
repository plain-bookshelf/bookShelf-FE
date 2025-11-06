import { instance } from "./axios"

export const getMain = async () => {
  return await instance.get("/main");
}