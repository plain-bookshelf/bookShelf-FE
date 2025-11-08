export type Book = {
  id: number;
  book_name: string;
  author: string;
  book_type: string;
  book_image_url: string;
}

export type MyBook = {
  title: string;
  state: number | string;
  id: number;
}

export type RecommandBook = {
  id: number;
  img: string;
  title: string;
  book_date: number;
  publisher: string;
  writer: string;
  description: string;
  is_school: boolean;
}