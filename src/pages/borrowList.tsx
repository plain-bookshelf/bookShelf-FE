import { CategoryBox, CheckBox, InfoBox } from "../components/borrowList/BorrowList";
import styled from "styled-components";
import PaginationBar from "../components/pagination/PaginationBar";
import { useList } from "../components/contexts/BorrowListContext";
import { useState, useEffect } from "react";
import SearchBar from "../components/searchBar/SearchBar";

export default function BorrowList() {
  const { listData } = useList();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [query, setQuery] = useState<String>("");
  const [check, setCheck] = useState(false);

  //여기서 페이지 단위로 데이터 + 페이지 개수 요청 보내면 될듯
  useEffect(() => {

  }, [currentPage])

  useEffect(() => {
    if(check===true){

    }
    else{

    }
  }, [check])

  const handleSearch = (content: string) => {
    if(content === ""){
      alert("검색어를 입력해주세요");
      return;
    }

    setQuery(content);
  }

  const toggleCheck = () => setCheck(!check);

  return(
    <>
      <Container>
        <SearchBar handleSearch={handleSearch} State="user" />
        <CheckBox checked={check} onChange={toggleCheck} />
        <CategoryBox />
        {listData.map((e) => (
          <InfoBox
            title={e.title}
            registerNumber={e.registerNumber}
            userName={e.userName}
            rentalDate={e.rentalDate}
            overdue={e.overdue}
            allow={e.allow}
          />
        ))}
      </Container>
      <PaginationBar 
        pageCount={pageCount}
        onPageChange={(page: any) => setCurrentPage(page)}
      />
    </>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`