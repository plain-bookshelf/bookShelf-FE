import { useState } from "react"
import Recoomand from "../components/recommand/RecommandBook"
import type { RecommandBook } from "../types/Book"
import styled from "styled-components";

export default function RecommandList() {
  const [recommandBooks, setRecommandBooks] = useState<RecommandBook[]>([{img: "a", title: "회색인간", book_author: "김동식", book_publisher: "요다", book_date: 2017, summary: "‘오늘의 유머’ 공포게시판에서 많은 이들의 호응을 얻었던 ‘김동식의 소설집’. 작가는 10년 동안 공장에서 노동하면서 머릿속으로 수없이 떠올렸던 이야기들을 거의 매일 게시판에 올렸다. ‘김동식 소설집’은 그렇게 써내려간 300편의 짧은 소설 가운데 66편을 추려 묶은 것이다.", possession: true, borrow: true, reserve: false}]);

  return (
    <>
      <Container>
        {recommandBooks.map((e) => (
          <Recoomand
            img={e.img} 
            title={e.title}
            book_author={e.book_author}
            book_publisher={e.book_publisher}
            book_date={e.book_date}
            summary={e.summary}
            possession={e.possession}
            borrow={e.borrow}
            reserve={e.reserve}
          ></Recoomand>
        ))}
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 75px;
  gap: 70px;
`