import SearchBar from "../components/SearchBar/SearchBar"
import * as B from "../components/Book/Book"
import type { Book, PopularBook } from "../type"
import { useState } from "react"
import { Line } from "../components/Book/style"

function temp(a: string){
  a+1
}

export default function Main() {
  const [searchBookList, setSearchBookList] = useState<Book[]>([]);
  const [popularBookList, setPopularBookList] = useState<PopularBook[]>([{title: "아 제발", author: "아 진짜", category: "암거나", nowRank: 3, preRank: 1, img: "a"}]);
  const [newBookList, setNewBookList] = useState<Book[]>([{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"},{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"},{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"},{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"},{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"},{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"},{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"},{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"}]);
 
 return(<>
    <SearchBar handleSearch={temp} />

    {searchBookList.length !== 0 &&
     <B.BookList searchTitle="책마루" BookListTitle="에 대한 검색 결과입니다">
        {searchBookList.map((e) => (
        <B.Book 
          title={e.title}
          author={e.author}
          category={e.category}
          img={e.img}
        />
      ))}
      </B.BookList>
    }

    <B.BookList BookListTitle="인기 도서">
      {popularBookList.map((e) => (
        <B.Popular 
          title={e.title}
          author={e.author}
          category={e.category}
          nowRank={e.nowRank}
          preRank={e.preRank}
          img={e.img}
        />
      ))}
    </B.BookList>
    <Line />
    <B.BookList BookListTitle="최신 도서">
      {newBookList.map((e) => (
        <B.Book 
          title={e.title}
          author={e.author}
          category={e.category}
          img={e.img}
        />
      ))}
    </B.BookList>
  </>)
}

