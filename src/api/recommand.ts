import axios from "axios";

export const postRecommand = async (userId: string) => {
  return await axios.post("http://43.202.168.222/books/book_post", { user_name: userId })
}