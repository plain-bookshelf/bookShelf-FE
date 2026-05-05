import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import deleteUserIcon from "../../assets/deleteUser.png";
import go from "../../assets/go.png";
import lock from "../../assets/lock.png";
import userImgEdit from "../../assets/userImgEdit.png";
import userInfoEdit from "../../assets/userInfoEdit.png";
import { getMyPage, getMyInfo, postLogout, putEditUserName } from "../../api/my";
import type { MyBook } from "../../types/Book";
import { getDayDiff } from "../../utils/daydiff";
import { useUser } from "../contexts/UserContext";
import DeleteUserModal from "../modal/styleB/DeleteUserModal";
import EditModal from "../modal/styleA/EditModal";
import * as S from "./style";

const truncateBookName = (book: MyBook) =>
  book.book_name.length > 8 ? { ...book, book_name: `${book.book_name.slice(0, 8)}...` } : book;

export default function MyProfile() {
  const { user, setUser } = useUser();
  const [borrowBooks, setBorrowBooks] = useState<MyBook[]>([]);
  const [reserveBooks, setReserveBooks] = useState<MyBook[]>([]);
  const [overdueBooks, setOverdueBooks] = useState<MyBook[]>([]);
  const [penalty, setPenalty] = useState(0);
  const [statistics, setStatistics] = useState(0);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editImgModal, setEditImgModal] = useState(false);
  const [editName, setEditName] = useState(user.nickName);
  const navigate = useNavigate();

  useEffect(() => {
    setEditName(user.nickName);
  }, [user.nickName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyPage(user.id);
        const data = response.data.data;

        setUser((prev) => ({
          ...prev,
          nickName: data.nick_name,
          img: data.profile,
        }));
        setStatistics(data.one_month_statistics);

        const rentalBook = data.rental_book as MyBook[];
        const reservationBook = (data.reservation_book as MyBook[]).map(truncateBookName);

        const borrowBook = rentalBook
          .filter((book) => !book.is_over_due)
          .map((book) => ({ ...book, day: getDayDiff(book.over_due_time!) }))
          .map(truncateBookName);

        const overdueBook = rentalBook
          .filter((book) => book.is_over_due)
          .map((book) => ({ ...book, day: Math.abs(getDayDiff(book.over_due_time!)) }))
          .map(truncateBookName);

        setBorrowBooks(borrowBook);
        setReserveBooks(reservationBook);
        setOverdueBooks(overdueBook);
        setPenalty(data.user_over_due_date);
      } catch (error) {
        console.log(error);
      }
    };

    if (!user.id) {
      return;
    }

    fetchData();
  }, [setUser, user.id]);

  const userEditInfo = async () => {
    setEditModal(true);

    try {
      const response = await getMyInfo(user.id);
      setUser({ ...user, email: response.data.data.address });
    } catch (error) {
      console.log(error);
    }
  };

  const submitNickname = async () => {
    if (editName.length < 3 || editName.length > 16) {
      alert("이름은 3자 이상 16자 이하로 입력해주세요.");
      return;
    }

    setUser({ ...user, nickName: editName });
    setEditModal(false);
    await putEditUserName(user.id, editName);
  };

  return (
    <S.Banner>
      <S.Container>
        <S.BannerTitle>마이페이지</S.BannerTitle>
        <S.ProfileContainer>
          <S.ProfileBox>
            <S.ProfileOutlien onClick={() => setEditImgModal(true)}>
              <img src={user.img} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
              <img src={userImgEdit} style={{ position: "absolute" }} />
            </S.ProfileOutlien>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
              <S.InfoTitle color="#00C471">{user.nickName}</S.InfoTitle>
              <S.InfoTitle color="black" style={{ marginRight: "17px" }}>님의 회원 정보</S.InfoTitle>
              <img src={userInfoEdit} onClick={userEditInfo} style={{ cursor: "pointer" }} />
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
              <span><S.InfoContent color="#00C471">{penalty}</S.InfoContent><S.InfoContent color="black">일</S.InfoContent></span>
            </S.InfoBox>
            <S.VerticalLine />
            <S.InfoBox>
              <S.InfoTitle color="black">월간 통계</S.InfoTitle>
              <span><S.InfoContent color="#00C471">{statistics}</S.InfoContent><S.InfoContent color="black">권</S.InfoContent></span>
            </S.InfoBox>
          </S.InfoContainer>
        </S.ProfileContainer>
      </S.Container>

      {!editModal && (
        <S.DetailInfoContainer>
          <S.DetailInfoBox>
            <S.DetailInfoTitle>대출</S.DetailInfoTitle>
            <S.DetailInfoList>
              {borrowBooks.map((book, index) => (
                <S.DetailInfo key={`borrow-${book.book_id}`}>
                  <S.BookInfoBox>
                    <S.BookNumber>{index + 1}</S.BookNumber>
                    <S.BookInfo>
                      <S.BookTitle>{book.book_name}</S.BookTitle>
                      <S.BookState>대여 {book.day}일 남음</S.BookState>
                    </S.BookInfo>
                  </S.BookInfoBox>
                </S.DetailInfo>
              ))}
            </S.DetailInfoList>
          </S.DetailInfoBox>

          <S.DetailInfoBox>
            <S.DetailInfoTitle>예약</S.DetailInfoTitle>
            <S.DetailInfoList>
              {reserveBooks.map((book, index) => (
                <S.DetailInfo key={`reserve-${book.book_id}`}>
                  <S.BookInfoBox>
                    <S.BookNumber>{index + 1}</S.BookNumber>
                    <S.BookInfo>
                      <S.BookTitle>{book.book_name}</S.BookTitle>
                      <S.BookState>예약 중</S.BookState>
                    </S.BookInfo>
                  </S.BookInfoBox>
                </S.DetailInfo>
              ))}
            </S.DetailInfoList>
          </S.DetailInfoBox>

          <S.DetailInfoBox>
            <S.DetailInfoTitle>연체</S.DetailInfoTitle>
            <S.DetailInfoList>
              {overdueBooks.map((book, index) => (
                <S.DetailInfo key={`overdue-${book.book_id}`}>
                  <S.BookInfoBox>
                    <S.BookNumber>{index + 1}</S.BookNumber>
                    <S.BookInfo>
                      <S.BookTitle>{book.book_name}</S.BookTitle>
                      <S.BookState>{book.day}일 연체중</S.BookState>
                    </S.BookInfo>
                  </S.BookInfoBox>
                </S.DetailInfo>
              ))}
            </S.DetailInfoList>
          </S.DetailInfoBox>
        </S.DetailInfoContainer>
      )}

      {editModal && (
        <S.EditContainer>
          <S.EditTitle>회원 정보</S.EditTitle>
          <S.EditInputContainer>
            <S.EditInputBox>
              <S.EditInputTitle>닉네임</S.EditInputTitle>
              <S.EditInput
                onKeyDown={async (event) => {
                  if (event.key === "Enter") {
                    await submitNickname();
                  }
                }}
                allow={true}
                weight={600}
                color="#5A5A5A"
                bgColor="#ffffff"
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
              />
            </S.EditInputBox>

            {user.email === "" ? (
              <S.EditInputBox onClick={() => navigate("/emailRegistration")} style={{ cursor: "pointer" }}>
                <S.EditInputTitle>이메일</S.EditInputTitle>
                <S.EditBox>
                  <S.EditInput allow={false} weight={600} bgColor="#ffffff" color="#5A5A5A" value="등록된 이메일이 없습니다." />
                  <S.EditGo go={571}>등록하러 가기</S.EditGo>
                </S.EditBox>
              </S.EditInputBox>
            ) : (
              <S.EditInputBox style={{ cursor: "not-allowed" }}>
                <S.EditInputTitle>이메일</S.EditInputTitle>
                <S.EditBox>
                  <S.EditInput allow={false} weight={600} bgColor="#f0f0f0" color="#5A5A5A" value={user.email} />
                </S.EditBox>
              </S.EditInputBox>
            )}

            <S.EditInputBox>
              <S.EditInputTitle><img src={lock} />비밀번호</S.EditInputTitle>
              <S.EditBox onClick={() => navigate("/myPwReset")}>
                <S.EditInput readOnly allow={true} weight={500} bgColor="#f0f0f0" color="#5A5A5A" value="비밀번호 재설정하러 가기" style={{ cursor: "pointer" }} />
                <S.EditGo go={653}><img src={go} style={{ cursor: "pointer" }} /></S.EditGo>
              </S.EditBox>
            </S.EditInputBox>

            <S.EditInputBox>
              <S.EditInputTitle><img src={lock} />로그아웃</S.EditInputTitle>
              <S.EditBox onClick={async () => {
                await postLogout();
              }}>
                <S.EditInput readOnly allow={true} weight={500} bgColor="#f0f0f0" color="#5A5A5A" value="로그아웃 하러가기" style={{ cursor: "pointer" }} />
                <S.EditGo go={653}><img src={go} style={{ cursor: "pointer" }} /></S.EditGo>
              </S.EditBox>
            </S.EditInputBox>

            <S.EditInputBox>
              <S.EditInputTitle><img src={deleteUserIcon} />회원탈퇴</S.EditInputTitle>
              <S.EditBox onClick={() => setDeleteUserModal(true)}>
                <S.EditInput readOnly allow={true} weight={500} bgColor="#f0f0f0" color="#5A5A5A" value="탈퇴진행" style={{ cursor: "pointer" }} />
                <S.EditGo go={653}><img src={go} style={{ cursor: "pointer" }} /></S.EditGo>
              </S.EditBox>
            </S.EditInputBox>
          </S.EditInputContainer>
          <S.Button onClick={submitNickname}>확인</S.Button>
        </S.EditContainer>
      )}

      {editImgModal && <EditModal onClose={() => setEditImgModal(false)} />}
      {deleteUserModal && <DeleteUserModal onClose={() => setDeleteUserModal(false)} />}
    </S.Banner>
  );
}
