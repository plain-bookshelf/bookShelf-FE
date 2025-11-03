import axios from "axios";

export const postRecommand = async (userId: number) => {
  return await axios.post("http://10.84.252.219:8000/book_history", { user: userId })
}