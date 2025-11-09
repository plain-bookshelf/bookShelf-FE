import axios from "axios";

export const postRecommand = async (userName: string) => {
  return await axios.post("http://43.202.168.222/books/book_post", { user_name: userName })
}