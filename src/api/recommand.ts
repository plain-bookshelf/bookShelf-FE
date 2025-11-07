import axios from "axios";

export const postRecommand = async (userId: string) => {
  return await axios.post("http://10.84.252.219:8000/books/book_post", { user_name: userId })
}