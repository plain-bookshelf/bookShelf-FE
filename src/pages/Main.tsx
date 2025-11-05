import SearchBar from "../components/searchBar/SearchBar"
import * as B from "../components/book/Book"
import type { Book, PopularBook } from "../types/Book"
import { useState } from "react"
import { Line, LineContainer } from "../components/book/style"
import styled from "styled-components"
import searchResult from "../assets/searchResult.png"

export default function Main() {
  const [searchBookList, setSearchBookList] = useState<Book[]>([]);
  const [popularBookList, setPopularBookList] = useState<PopularBook[]>([{title: "아 제발", author: "아 진짜", category: "암거나", nowRank: 3, preRank: 1, img: "a"}]);
  const [newBookList, setNewBookList] = useState<Book[]>([{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"},{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"},{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"},{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"},{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"},{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"},{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"},{title: "아 제발", author: "아 진짜", category: "암거나", img: "temp"}]);
  const [search, setSearch] = useState<Boolean>(false);
  const [query, setQuery] = useState<String>("");

  function temp(content: string){
    if(content === ""){
      alert("검색어를 입력해주세요");
      return;
    }

    setQuery(content);
    setSearch(true);
  } 
 
 return(<>
    <SearchBar handleSearch={temp} />

    {searchBookList.length !== 0 && search &&
      <div>
        <Title style={{margin: "0px auto 60px 240px"}}><span style={{color: "#00C471"}}>'{query}'</span> 에 대한 검색 결과입니다</Title>
        <B.BookList BookListTitle="검색 결과">
          {searchBookList.map((e) => (
          <B.Book
            title={e.title}
            author={e.author}
            category={e.category}
            img={e.img}
          />
        ))}
        </B.BookList>
      </div>
    }

    {searchBookList.length === 0 && search &&
      <Container>
        <img src={searchResult} style={{margin: "155px 0 54px"}} />
        <Title style={{margin: "0 0 100px 0", color: "#878787"}}><span style={{color: "#00C471", fontSize: "40px"}}>'{query}'</span>에 대한 검색 결과가 없습니다</Title>
      </Container>
    }

    {!search &&
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
    }

    <LineContainer>
      {!search && <Line />}
    </LineContainer>

    {!search &&
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
    }
  </>)
}

const Title = styled.h1`
  margin: 0;
  font-size: 36px;
  font-weight: 600;
  color: black;
  margin: 0 0 80px 240px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`