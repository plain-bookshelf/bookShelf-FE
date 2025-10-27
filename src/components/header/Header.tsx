import * as S from "./style"
import logo from "../../assets/logo.png";
import home from "../../assets/home.png";
import user from "../../assets/user.png"; 
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <S.Container>
        <S.Logo src={logo} alt="bookShlf-logo" onClick={() => navigate("/")} />
        <S.PageContent>
          <S.BookRequest onClick={() => navigate("/temp")}>도서신청</S.BookRequest>
          <S.FindFavoriteBooks onClick={(() => navigate("/recommand"))}>내 취향 도서 찾기</S.FindFavoriteBooks>
          <S.MyPage onClick={() => navigate("/My")}>마이페이지</S.MyPage>
        </S.PageContent>
        <S.TextContent>
          <S.SignUpContent>
            <img src={home} />
            <S.SignUpText onClick={() => navigate("/signup")}>회원가입</S.SignUpText>
          </S.SignUpContent>
          <S.LogInContent>
            <img src={user} /> 
            <S.LogInText onClick={() => navigate("/login")}>로그인</S.LogInText>
          </S.LogInContent>
        </S.TextContent>
      </S.Container>
    </>
  )
}


export default Header

