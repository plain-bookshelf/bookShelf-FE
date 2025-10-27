import * as S from "./style"
import { useState } from "react"
import type { MyBook } from "../../types/Book";
import userInfoedit from "../../assets/userInfoEdit.png"
import userImgEdit from "../../assets/userImgEdit.png"
import { useUser } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";
import EditModal from "../modal/styleA/EditModal";

export default function MyProfile() {
  const { user, editUser } = useUser()
  const [borrowBooks, setBorrowBooks] = useState<MyBook[]>([{title: "죽고 싶은 아이. 1", state: 3, id: 1},{title: "푸른사자와니니", state: 12, id: 2},{title: "디자인좀 그만 바뀌면", state: 100, id: 3},{title: "디자인좀 그만 바뀌면", state: 100, id: 4}]);
  const [reserveBooks, setReserveBooks] = useState<MyBook[]>([{title: "동이는 장돌뱅...", state: "대여", id: 1,}]);
  const [overdueBooks, setOverdueBooks] = useState<MyBook[]>([{title: "자몽살구클럽", state: 6, id: 1}, {title: "자몽살구클럽", state: 4, id: 2}]);
  const [penalty, setPenalty] = useState(0);
  const [overdueStaes, setOverdueStaes] = useState(Math.max(...overdueBooks.map(e => Number(e.state))));
  const [statistics, setStatistics] = useState(0);
  const [edit, setEdit] = useState(false);
  const [editImgModal, setEditImgModal] = useState(false);
  const [uploadImgModal, setUploadImgModal] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editPassword, setEditPassword] = useState("");

  return(
    <>
      <S.Banner>
        <S.Container>
          <S.BannerTitle>마이페이지</S.BannerTitle>
          <S.ProfileContainer>
            <S.ProfileBox>
              <S.ProfileOutlien onClick={() => setUploadImgModal(true)}>
                <img src={user.img} style={{width: "100px"}} />
                <img src={userImgEdit} style={{position: "absolute"}} />
              </S.ProfileOutlien>
              <div style={{display: "flex", alignItems: "center"}}>
                <S.InfoTitle color="#00C471">{user.name}</S.InfoTitle>
                <S.InfoTitle color="black" style={{marginRight: "17px"}}>님의 회원정보</S.InfoTitle>
                <img src={userInfoedit} onClick={() => setEdit(true)} style={{cursor: "pointer"}} />
              </div>
            </S.ProfileBox>
            <S.InfoContainer>
              <S.InfoBox>
                <S.InfoTitle color="black">대출</S.InfoTitle>
                <span><S.InfoContent color="#00C471">{borrowBooks.length}</S.InfoContent><S.InfoContent color="black">권</S.InfoContent></span>
              </S.InfoBox>
              <S.VerticalLine />
              <S.InfoBox>
                <S.InfoTitle color="black">예약</S.InfoTitle>
                <span><S.InfoContent color="#00C471">{reserveBooks.length}</S.InfoContent><S.InfoContent color="black">권</S.InfoContent></span>
              </S.InfoBox>
              <S.VerticalLine />
              <S.InfoBox>
                <S.InfoTitle color="black">연체기간</S.InfoTitle>
                <span><S.InfoContent color="#00C471">{overdueBooks.length !== 0 ? overdueStaes : penalty}</S.InfoContent><S.InfoContent color="black">일</S.InfoContent></span>
              </S.InfoBox>
              <S.VerticalLine />
              <S.InfoBox>
                <S.InfoTitle color="black">한 달 통계</S.InfoTitle>
                <span><S.InfoContent color="#00C471">{statistics}</S.InfoContent><S.InfoContent color="black">권</S.InfoContent></span>
              </S.InfoBox>
            </S.InfoContainer>
          </S.ProfileContainer>
        </S.Container>
          {!edit && <S.DetailInfoContainer>
            <S.DetailInfoBox>
              <S.DetailInfoTitle>대출</S.DetailInfoTitle>
              <S.DetailInfoList>
                {borrowBooks.map((e) => (
                <S.DetailInfo>
                  <S.BookInfoBox>
                    <S.BookNumber>{e.id}</S.BookNumber>
                    <S.BookInfo>
                      <S.BookTitle>{e.title}</S.BookTitle>
                      <S.BookState>대여 {e.state}일 남음</S.BookState>
                    </S.BookInfo>
                  </S.BookInfoBox>
                </S.DetailInfo>
                ))}
              </S.DetailInfoList>
            </S.DetailInfoBox>
            <S.DetailInfoBox>
              <S.DetailInfoTitle>예약</S.DetailInfoTitle>
              <S.DetailInfoList>
                {reserveBooks.map((e) => (
                <S.DetailInfo>
                  <S.BookInfoBox>
                    <S.BookNumber>{e.id}</S.BookNumber>
                    <S.BookInfo>
                      <S.BookTitle>{e.title}</S.BookTitle>
                      <S.BookState>예약</S.BookState>
                    </S.BookInfo>
                  </S.BookInfoBox>
                </S.DetailInfo>
                ))}
              </S.DetailInfoList>
            </S.DetailInfoBox>
            <S.DetailInfoBox>
              <S.DetailInfoTitle>연체</S.DetailInfoTitle>
              <S.DetailInfoList>
                {overdueBooks.map((e) =>  (
                <S.DetailInfo>
                  <S.BookInfoBox>
                    <S.BookNumber>{e.id}</S.BookNumber>
                    <S.BookInfo>
                      <S.BookTitle>{e.title}</S.BookTitle>
                      <S.BookState>{e.state}일 연체중</S.BookState>
                    </S.BookInfo>
                  </S.BookInfoBox>
                </S.DetailInfo>
                ))}
              </S.DetailInfoList>
            </S.DetailInfoBox>
          </S.DetailInfoContainer>}
          {edit && <S.EditContainer>
            <S.EditTitle>유저 정보</S.EditTitle>
              <S.EditInputContainer>
              <S.EditInputBox>
                <S.EditInputTitle>닉네임</S.EditInputTitle>
                <S.EditInput
                  color="#ffffff"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}></S.EditInput>
              </S.EditInputBox>
              <S.EditInputBox>
                <S.EditInputTitle>비밀번호 수정</S.EditInputTitle>
                <S.EditInput
                  color="#ffffff"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                ></S.EditInput>
              </S.EditInputBox>
            </S.EditInputContainer>
            <S.Button>확인</S.Button>
          </S.EditContainer>}
          {uploadImgModal && <EditModal onClose={() => setUploadImgModal(false)}/>}
      </S.Banner>
    </>
  )
}