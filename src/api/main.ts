import { instance } from "./axios"

export const getMain = async () => {
  return await instance.get(`/main`);
}

export const getBookSearch = async (query: string) => {
  return await instance.get(`/api/search?keyword=${query}`)
}