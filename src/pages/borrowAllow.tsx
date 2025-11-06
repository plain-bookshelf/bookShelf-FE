import { CategoryBox, InfoBox } from "../components/borrowMange/borrowManage";
import styled from "styled-components";
import PaginationBar from "../components/pagination/PaginationBar";
import { useManage } from "../components/contexts/ManagementContext";
import { useState, useEffect } from "react";

export default function AllowList() {
  const { manageData } = useManage();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  //여기서 페이지 단위로 데이터 + 페이지 개수 요청 보내면 될듯
  useEffect(() => {
    
  }, [currentPage]);

  return(
    <>
      <Container>
        <CategoryBox />
        {manageData.map((e) => (
          <InfoBox
            title={e.title}
            registerNumber={e.registerNumber}
            userName={e.userName}
            requestDate={e.requestDate}
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
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`