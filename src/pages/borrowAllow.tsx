import { useContext, useState } from "react";
import { CategoryBox, InfoBox } from "../components/borrowMange/borrowManage";
import styled from "styled-components";
import type { BorrowAllow } from "../types/Manage";
import PaginationBar from "../components/pagination/PaginationBar";
import { ManagementContext } from "../components/contexts/ManagementContext";

export default function BorrowAllow() {
  const {manageData, setManageData} = useContext(ManagementContext)

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