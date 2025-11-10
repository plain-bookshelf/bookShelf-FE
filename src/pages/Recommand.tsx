import { useEffect, useState } from "react"
import Recoomand from "../components/recommand/RecommandBook"
import type { RecommandBook } from "../types/Book"
import styled from "styled-components";
import { postRecommand } from "../api/recommand";
import { useUser } from "../components/contexts/UserContext";
import { bouncy } from 'ldrs'
import recommandResult from "../assets/searchResult.png"
bouncy.register();

export default function RecommandList() {
  const { user } = useUser();
  const [recommandBooks, setRecommandBooks] = useState<RecommandBook[]>([]);
  const [loading, setloading] = useState(true);

  let bookList = [];

  useEffect(() => {
    const fetchData = async () => {
      try{
        console.log("요청 보냄");
        const res = await postRecommand(user.name);
        setRecommandBooks(res.data);
        setloading(false);
        bookList = res.data;
      } catch(error) {
        console.error(error);
      } 
    }

    fetchData();
  }, [user.id])

  return (
    <>
      <Container>
        {recommandBooks.map((e) => (
          <Recoomand
            id={e.id}
            img={e.img} 
            title={e.title}
            writer={e.writer}
            publisher={e.publisher}
            book_date={e.book_date}
            description={e.description}
            is_school={e.is_school}
          ></Recoomand>
        ))}
      </Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 75px;
  gap: 35px;
`

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