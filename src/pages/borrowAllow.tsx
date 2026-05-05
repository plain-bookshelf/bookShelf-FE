import { useEffect, useState } from "react";
import { useManage } from "../shared/contexts/ManagementContext";
import PaginationBar from "../shared/pagination/PaginationBar";
import { CategoryBox, InfoBox } from "../shared/borrowMange/borrowManage";
import { getAllowList } from "../api/manage";
import styled from "styled-components";

export default function AllowList() {
  const { manageData, setManageData } = useManage();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllowList(currentPage);
        setPageCount(response.data.data.total_pages);
        setManageData(response.data.data.response_dto_list);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage, setManageData]);

  return (
    <>
      <Container>
        <CategoryBox />
        {manageData.map((item) => (
          <InfoBox key={item.registration_number} {...item} />
        ))}
      </Container>
      <PaginationBar pageCount={pageCount} onPageChange={(event) => setCurrentPage(event.selected)} />
    </>
  );
}

const Container = styled.div`
  width: 100%;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

