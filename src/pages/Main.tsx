import SearchBar from "../components/searchBar/SearchBar"
import * as B from "../components/book/Book"
import type { Book } from "../types/Book"
import { useEffect, useState } from "react"
import { Line, LineContainer } from "../components/book/style"
import styled from "styled-components"
import searchResult from "../assets/searchResult.png"
import { getMain } from "../api/main"
import { useUser } from "../components/contexts/UserContext"

export default function Main() {
  const { user, setUser } = useUser();
  const [searchBookList, setSearchBookList] = useState<Book[]>([]);
  const [popularBookList, setPopularBookList] = useState<Book[]>([{id: 1, book_name: "공중그네", book_type: "dddd>dddsa>한국소설", book_image_url: "https://image.aladin.co.kr/product/53/67/cover200/895660102x_2.jpg", author: "저자"}]);
  const [newBookList, setNewBookList] = useState<Book[]>([]);
  const [search, setSearch] = useState<Boolean>(false);
  const [query, setQuery] = useState<String>("");

useEffect(() => {
    const fetchData = async () => {
      try{
        console.log("요청 보냄");
        const res = await getMain();
        setPopularBookList(res.data.data.book_popularity_list_response_dto);
        setNewBookList(res.data.data.book_recent_list_response_dto);
        setUser({...user, img: res.data.data.profile})

      } catch(error) {
        console.error(error);
      } 
    }

    fetchData();
  }, [])


  const handleSearch = (content: string) => {
    if(content === ""){
      alert("검색어를 입력해주세요");
      return;
    }

    setQuery(content);
    setSearch(true);
  }
 
 return(<>
    <SearchBar handleSearch={handleSearch} State="book" />

    {searchBookList.length !== 0 && search &&
      <div>
        <Title style={{margin: "0px auto 60px 240px"}}><span style={{color: "#00C471"}}>'{query}'</span> 에 대한 검색 결과입니다</Title>
        <B.BookList BookListTitle="검색 결과">
          {searchBookList.map((e) => (
          <B.Book
            id={e.id}
            book_name={e.book_name}
            author={e.author}
            book_type={e.book_type}
            book_image_url={e.book_image_url}
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
            id={e.id}
            book_name={e.book_name}
            author={e.author}
            book_type={e.book_type}
            book_image_url={e.book_image_url}
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
            id={e.id}
            book_name={e.book_name}
            author={e.author}
            book_type={e.book_type}
            book_image_url={e.book_image_url}
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