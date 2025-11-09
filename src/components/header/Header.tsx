import * as S from "./style";
import headerLogo from "../../assets/headerLogo.svg";
import user from "../../assets/user.svg";
import home from "../../assets/home.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // state로 관리 (처음엔 localStorage 보고 판단)
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  // 라우트가 바뀔 때마다 토큰 다시 체크해서 헤더 갱신
  useEffect(() => {
    const hasToken = !!localStorage.getItem("access_token");
    setIsLoggedIn(hasToken);
  }, [location]);

  // 로그인 필요한 메뉴 공통 처리
  const handleProtectedNav = (path: string) => {
    if (!isLoggedIn) {
      alert("로그인 후 이용할 수 있는 메뉴입니다.");
      navigate("/login");
      return;
    }
    navigate(path);
  };

  return (
    <S.Container>
      <S.Logo
        src={headerLogo}
        alt="bookShlf-logo"
        onClick={() => handleProtectedNav("/")}
      />

      <S.PageContent>
        <S.BookRequest onClick={() => handleProtectedNav("/temp")}>
          도서신청
        </S.BookRequest>
        <S.FindFavoriteBooks onClick={() => handleProtectedNav("/recommand")}>
          내 취향 도서 찾기
        </S.FindFavoriteBooks>
        <S.MyPage onClick={() => handleProtectedNav("/My")}>
          마이페이지
        </S.MyPage>
        <S.AiPage onClick={() => handleProtectedNav("/Ai")}>
          마루 Ai
        </S.AiPage>
      </S.PageContent>

      {isLoggedIn ? (
        // ✅ 로그인 상태: 프로필 아이콘
        <S.ProfileWrapper onClick={() => navigate("/My")}>
          <S.ProfileAvatar src={user} alt="user-profile" />
        </S.ProfileWrapper>
      ) : (
        // ✅ 비로그인 상태: 회원가입 / 로그인
        <S.TextContent>
          <S.SignUpContent onClick={() => navigate("/signup")}>
            <img src={home} alt="home-icon" />
            <S.SignUpText>회원가입</S.SignUpText>
          </S.SignUpContent>
          <S.LogInContent onClick={() => navigate("/login")}>
            <img src={user} alt="user-icon" />
            <S.LogInText>로그인</S.LogInText>
          </S.LogInContent>
        </S.TextContent>
      )}
    </S.Container>
  );
}

export default Header;