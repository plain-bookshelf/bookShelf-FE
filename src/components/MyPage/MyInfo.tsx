import * as S from "./style"
import { useState } from "react"
import type { MyBook } from "../../type";

export default function MyProfile() {
  const [userInfo, setUserInfo] = useState({name: "ZXO", img: "https://cdn.discordapp.com/attachments/1137618300638072832/1419603738586382356/image.png?ex=68d456c2&is=68d30542&hm=81cc1868de12d0dc5cd1c43c32159935a71fb725ea8336145e341de6c3c7079c&"});
  const [borrowBooks, setBorrowBooks] = useState<MyBook[]>([{title: "죽고 싶은 아이. 1", state: 3, id: 1},{title: "푸른사자와니니", state: 12, id: 2}]);
  const [reserveBooks, setReserveBooks] = useState<MyBook[]>([{title: "동이는 장돌뱅...", state: "대여", id: 1,}]);
  const [overdueBooks, setOverdueBooks] = useState<MyBook[]>([{title: "자몽살구클럽", state: 6, id: 1}, {title: "자몽살구클럽", state: 4, id: 2}]);
  const [penalty, setPenalty] = useState(0);
  const [overdueStaes, setOverdueStaes] = useState(Math.max(...overdueBooks.map(e => Number(e.state))));
  const [statistics, setStatistics] = useState(0);

  return(
    <>
      <S.Banner>
        <S.Container>
          <S.BannerTitle>마이페이지</S.BannerTitle>
          <S.ProfileContainer>
            <S.ProfileBox>
              <img src={userInfo.img} alt="" style={{width: 100}} />
              <span><S.InfoTitle color="#00C471">{userInfo.name}</S.InfoTitle><S.InfoTitle color="black">님의 회원정보</S.InfoTitle></span>
            </S.ProfileBox>
            <S.InfoContainer>
              <S.InfoBox>
                <S.InfoTitle color="black">대출</S.InfoTitle>
                <span><S.InfoContent color="#00C471">{borrowBooks.length}</S.InfoContent><S.InfoContent color="black">권</S.InfoContent></span>
              </S.InfoBox>
              <S.InfoBox>
                <S.InfoTitle color="black">예약</S.InfoTitle>
                <span><S.InfoContent color="#00C471">{reserveBooks.length}</S.InfoContent><S.InfoContent color="black">권</S.InfoContent></span>
              </S.InfoBox>
              <S.InfoBox>
                <S.InfoTitle color="black">연체 기간</S.InfoTitle>
                <span><S.InfoContent color="#00C471">{overdueBooks.length !== 0 ? overdueStaes : penalty}</S.InfoContent><S.InfoContent color="black">일</S.InfoContent></span>
              </S.InfoBox>
              <S.InfoBox>
                <S.InfoTitle color="black">한 달 통계</S.InfoTitle>
                <span><S.InfoContent color="#00C471">{statistics}</S.InfoContent><S.InfoContent color="black">권</S.InfoContent></span>
              </S.InfoBox>
            </S.InfoContainer>
          </S.ProfileContainer>
          <S.DetailInfoContainer>
            <S.DetailInfoBox>
              <S.DetailInfoTitle>대출</S.DetailInfoTitle>
              <S.DetailInfoList>
                {borrowBooks.map((e) => (
                <S.DetailInfo>
                  <S.Line></S.Line>
                  <S.BookInfoBox>
                    <S.BookNumber>{e.id}</S.BookNumber>
                    <S.BookInfo>
                      <S.BookState>{e.title}</S.BookState>
                      <S.BookState>대여 {e.state}일 남음</S.BookState>
                    </S.BookInfo>
                  </S.BookInfoBox>
                  <S.Line></S.Line>
                </S.DetailInfo>
                ))}
              </S.DetailInfoList>
            </S.DetailInfoBox>
            <S.DetailInfoBox>
              <S.DetailInfoTitle>예약</S.DetailInfoTitle>
              <S.DetailInfoList>
                {reserveBooks.map((e) => (
                <S.DetailInfo>
                  <S.Line></S.Line>
                  <S.BookInfoBox>
                    <S.BookNumber>{e.id}</S.BookNumber>
                    <S.BookInfo>
                      <S.BookState>{e.title}</S.BookState>
                      <S.BookState>예약</S.BookState>
                    </S.BookInfo>
                  </S.BookInfoBox>
                  <S.Line></S.Line>
                </S.DetailInfo>
                ))}
              </S.DetailInfoList>
            </S.DetailInfoBox>
            <S.DetailInfoBox>
              <S.DetailInfoTitle>연체</S.DetailInfoTitle>
              <S.DetailInfoList>
                {overdueBooks.map((e) =>  (
                <S.DetailInfo>
                  <S.Line></S.Line>
                  <S.BookInfoBox>
                    <S.BookNumber>{e.id}</S.BookNumber>
                    <S.BookInfo>
                      <S.BookState>{e.title}</S.BookState>
                      <S.BookState>{e.state}일 연체중</S.BookState>
                    </S.BookInfo>
                  </S.BookInfoBox>
                  <S.Line></S.Line>
                </S.DetailInfo>
                ))}
              </S.DetailInfoList>
            </S.DetailInfoBox>
          </S.DetailInfoContainer>
        </S.Container>
      </S.Banner>
    </>
  )
}