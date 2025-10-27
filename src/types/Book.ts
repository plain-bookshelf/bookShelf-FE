export type Book = {
  title: string;
  author: string;
  category: string;
  img: string;
}

export type PopularBook = {
  title: string;
  author: string;
  category: string;
  nowRank: number;
  preRank: number;
  img: string;
}

export type MyBook = {
  title: string;
  state: number | string;
  id: number;
}

export type RecommandBook = {
  img: string;
  title: string;
  book_date: number;
  book_publisher: string;
  book_author: string;
  summary: string;
  possession: boolean;
  borrow: boolean;
  reserve: boolean;
}