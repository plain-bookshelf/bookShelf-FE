import { CategoryBox, InfoBox } from "../components/borrowList/BorrowList";
import styled from "styled-components";
import PaginationBar from "../components/pagination/PaginationBar";
import { useList } from "../components/contexts/BorrowListContext";

export default function List() {
  const {listData} = useList();

  return(
    <>
      <Container>
        <CategoryBox />
        {listData.map((e) => (
          <InfoBox
            title={e.title}
            registerNumber={e.registerNumber}
            userName={e.userName}
            rentalDate={e.rentalDate}
          />
        ))}
      </Container>
      <PaginationBar />
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