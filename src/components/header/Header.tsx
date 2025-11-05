import * as S from "./style";
import headerLogo from "../../assets/headerLogo.svg";
import user from "../../assets/user.svg"; 
import { useNavigate } from "react-router-dom";

function Header() {
  
  const navigate = useNavigate()
  
  return (
    <>
      <S.Container>
        <S.Logo src={headerLogo} alt="bookShlf-logo"  onClick={() => navigate("/")}/>
        <S.PageContent>
          <S.FindFavoriteBooks onClick={() => navigate("/recommand")}>내 취향 도서 찾기</S.FindFavoriteBooks>
          <S.MyPage onClick={() => navigate("/My")}>마이페이지</S.MyPage>
          <S.AiPage onClick={() => navigate("/Ai")}>마루 Ai</S.AiPage>
        </S.PageContent>
        <S.UserContent>
          <S.User src={user} onClick={() => navigate("/logIn")}/>
        </S.UserContent>
      </S.Container>
    </>
  )
}

export default Header

