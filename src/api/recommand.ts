import axios from "axios";

export const postRecommand = async (userId: string) => {
  return await axios.post("http://192.168.1.19:8000/book_post", { user_name: userId })
}