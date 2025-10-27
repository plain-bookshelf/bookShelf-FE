import * as S from "./style"
import type { RecommandBook } from "../../types/Book"
import allow from "../../assets/Allow.png"
import notAllow from "../../assets/notAllow.png"

export default function Recoomand(Book: RecommandBook) {
  return (
    <>
      <S.BookBox>
        <S.BookImg src={Book.img} />
        <S.BookContent>
          <S.BookTitle>{Book.title}</S.BookTitle>
          <S.PublicationInfo>
            <span style={{color: "black"}}>{Book.book_author}</span> 저&nbsp;|&nbsp;
            <span style={{color: "black"}}>{Book.book_publisher}</span> 출판사&nbsp;|&nbsp;
            {Book.book_date}  
          </S.PublicationInfo>
          <S.BookSummary>{Book.summary}</S.BookSummary>
          <S.Possession status={Book.possession}>우리학교</S.Possession>
          <S.ButtonBox>
            {/*대출, 예약, 신청 등 책의 상태에 따라서 버튼 색 바뀝니당*/}
            {Book.borrow === true ?
              <S.Button status={true}>
                <img src={allow} />
                대출하기
              </S.Button> 
            : <S.Button status={false} >
                <img src={notAllow} />
                대출하기
              </S.Button>}
            
            {Book.reserve === true ?
              <S.Button status={true}>
                대출예약
              </S.Button> 
            : <S.Button status={false}>
                대출예약
              </S.Button>}

            {Book.borrow === false && Book.reserve === false ?
              <S.Button status={true}>
                신청하기
              </S.Button> 
            : <S.Button status={false}>
                신청하기
              </S.Button>}
          </S.ButtonBox>
        </S.BookContent>
      </S.BookBox>
    </>
  )
}