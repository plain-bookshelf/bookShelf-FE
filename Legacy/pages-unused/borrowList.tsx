import { useEffect, useState } from "react";
import styled from "styled-components";
import { getOverdueList, getRentalList, getUserSearch } from "../api/manage";
import { CategoryBox, CheckBox, InfoBox } from "../shared/borrowList/BorrowList";
import { useList } from "../shared/contexts/BorrowListContext";
import PaginationBar from "../shared/pagination/PaginationBar";
import SearchBar from "../shared/SearchBar/SearchBar";

interface PaginationChangeEvent {
  selected: number;
}

export default function BorrowList() {
  const { listData, setListData } = useList();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [query, setQuery] = useState("");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (query !== "") {
          response = await getUserSearch(query);
        } else if (check) {
          response = await getOverdueList(currentPage);
        } else {
          response = await getRentalList(currentPage);
        }

        setPageCount(response.data.data.total_pages);
        setListData(response.data.data.response_dto_list);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [check, currentPage, query, setListData]);

  useEffect(() => {
    setCurrentPage(0);
  }, [check, query]);

  const handleSearch = (content: string) => {
    if (!content.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    setQuery(content);
  };

  return (
    <>
      <Container>
        <SearchBar handleSearch={handleSearch} State="user" />
        <CheckBox checked={check} onChange={() => setCheck((prev) => !prev)} />
        <CategoryBox />
        {listData.map((item) => (
          <InfoBox key={item.registration_number} {...item} />
        ))}
      </Container>
      <PaginationBar pageCount={pageCount} onPageChange={(event: PaginationChangeEvent) => setCurrentPage(event.selected)} />
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

