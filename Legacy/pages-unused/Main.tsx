import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import searchResult from "../assets/searchResult.png";
import { getBookSearch, getMain } from "../api/main";
import * as B from "../shared/Book/Book";
import { Line, LineContainer } from "../shared/Book/style";
import SearchBar from "../shared/SearchBar/SearchBar";
import { useUser } from "../shared/contexts/UserContext";
import Loading from "../shared/loading/loading";
import type { Book, SearchBook } from "../types/Book";
import { setUserId } from "../utils/tokenService";

export default function Main() {
  const { setUser } = useUser();
  const [searchBookList, setSearchBookList] = useState<SearchBook[]>([]);
  const [popularBookList, setPopularBookList] = useState<Book[]>([]);
  const [newBookList, setNewBookList] = useState<Book[]>([]);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMain();
        const data = response.data.data;

        setPopularBookList(data.book_popularity_list_response_dto);
        setNewBookList(data.book_recent_list_response_dto);
        setUser((prev) => ({
          ...prev,
          img: data.profile,
          id: data.member_id,
        }));
        setUserId(data.member_id);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setUser]);

  const handleSearch = (content: string) => {
    if (!content.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    setQuery(content);
    setSearch(true);
  };

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        setLoading(true);
        const response = await getBookSearch(query);
        setSearchBookList(response.data.data?.results ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearch();
    }
  }, [query]);

  return (
    <>
      <SearchBar handleSearch={handleSearch} State="book" />

      {searchBookList.length !== 0 && search && (
        <div>
          <Title style={{ marginBottom: "50px" }}>
            <span style={{ color: "#00C471" }}>'{query}'</span>에 대한 검색 결과입니다.
          </Title>
          <B.BookList BookListTitle="검색 결과">
            {searchBookList.map((book) => (
              <B.Book
                key={book.id}
                id={book.id}
                book_name={book.book_name}
                author={book.author}
                book_type={book.book_type}
                book_image_url={book.book_image}
                onClick={() => navigate(`books/${book.id}`)}
              />
            ))}
          </B.BookList>
        </div>
      )}

      {searchBookList.length === 0 && search && !loading && (
        <Container>
          <img src={searchResult} alt="검색 결과 없음" style={{ margin: "155px 0 54px" }} />
          <Title style={{ margin: "0 auto 100px", color: "#878787", textAlign: "center" }}>
            <span style={{ color: "#00C471", fontSize: "40px" }}>'{query}'</span>에 대한 검색 결과가 없습니다.
          </Title>
        </Container>
      )}

      {!search && !loading && (
        <B.BookList BookListTitle="인기 도서">
          {popularBookList.map((book, index) => (
            <B.Popular
              key={book.id}
              rank={index + 1}
              id={book.id}
              book_name={book.book_name}
              author={book.author}
              book_type={book.book_type}
              book_image_url={book.book_image_url}
              onClick={() => navigate(`books/${book.id}`)}
            />
          ))}
        </B.BookList>
      )}

      {!loading && (
        <LineContainer>
          {!search && <Line />}
        </LineContainer>
      )}

      {!search && !loading && (
        <B.BookList BookListTitle="최신 도서">
          {newBookList.map((book) => (
            <B.Book
              key={book.id}
              id={book.id}
              book_name={book.book_name}
              author={book.author}
              book_type={book.book_type}
              book_image_url={book.book_image_url}
              onClick={() => navigate(`books/${book.id}`)}
            />
          ))}
        </B.BookList>
      )}
      <Loading loading={loading} />
    </>
  );
}

const Title = styled.h1`
  width: min(100%, var(--content-max-width));
  margin: 0 auto 80px;
  padding: 0 var(--page-gutter);
  font-size: 36px;
  font-weight: 600;
  color: black;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

