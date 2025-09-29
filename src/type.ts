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

export type UserInfo = {
  name: string;
  img: string;
}