import styled from 'styled-components';
import { bouncy } from 'ldrs'
import recommandResult from "../../assets/searchResult.png"
import type { RecommandBook } from "../../types/Book"
bouncy.register();

type Loading = {
  loading: boolean;
  bookList?: RecommandBook[];
}

export default function Loading({ loading, bookList }: Loading) {
  if(bookList === undefined){
    bookList = [{id: 1, img: "", is_school: false, title: "", book_date: 1, publisher: "", writer: "", description: ""}]
  }

  return(
    <>
      {loading && <LoadingContainer >
        <l-bouncy
          size="70"
          speed="2.0" 
          color="#00C471" 
        ></l-bouncy>
      </LoadingContainer>}

      {bookList.length === 0 && !loading &&
        <ResultContainer>
          <img src={recommandResult} style={{margin: "155px 0 54px"}} />
          <Title style={{margin: "0 0 100px 0", color: "#878787"}}>대여한 책이 없습니다</Title>
        </ResultContainer>
      }
    </>
  )
}

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
`

const Title = styled.h1`
  margin: 0;
  font-size: 36px;
  font-weight: 600;
  color: black;
  margin: 0 0 80px 240px;
`

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`