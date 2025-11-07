import * as S from "./style"
import type { RecommandBook } from "../../types/Book"

export default function Recoomand(Book: RecommandBook) {
  return (
    <>
      <S.BookBox>
        <S.BookImg src={Book.img} />
        <S.BookContent>
          <S.BookTitle>{Book.title}</S.BookTitle>
          <S.PublicationInfo>
            <span style={{color: "black"}}>{Book.writer}</span> 저&nbsp;|&nbsp;
            <span style={{color: "black"}}>{Book.publisher}</span> 출판사&nbsp;|&nbsp;
            {Book.book_date}  
          </S.PublicationInfo>
          <S.BookSummary>{Book.description}</S.BookSummary>
          <S.Possession status={Book.is_school}>우리학교</S.Possession>
        </S.BookContent>
      </S.BookBox>
      <S.Line />
    </>
  )
}