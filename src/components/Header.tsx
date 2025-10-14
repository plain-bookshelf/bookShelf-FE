import styled from "styled-components";
import logo from "../assets/logo.png";
import home from "../assets/home.png";
import user from "../assets/user.png"; 

function Header() {
  return (
    <>
      <Container>
        <Logo src={logo} alt="bookShlf-logo" />
        <PageContent>
          <BookRequest href="">도서신청</BookRequest>
          <FindFavoriteBooks href="">내 취향 도서 찾기</FindFavoriteBooks>
          <MyPage href="">마이페이지</MyPage>
        </PageContent>
        <TextContent>
          <SignUpContent>
            <Home src={home} />
            <SignUpText href="">회원가입</SignUpText>
          </SignUpContent>
          <LogInContent>
            <User src={user} /> 
            <LogInText href="">로그인</LogInText>
          </LogInContent>
        </TextContent>
      </Container>
    </>
  )
}

const Container = styled.div`
    height: 96px;
    width: 1920px;
    border-bottom: 2px solid #00C471;
    position: fixed;
    top: 0px;
    left: 0px;
    
    display: flex;
    
`

const Logo = styled.img`
  margin-left: 240px;
`

const PageContent = styled.div`
  width: 526px;
  height: 47px;
  margin-top: 24px;
  margin-bottom: 25px;
  margin-left: 55px;
  margin-right: 425px;
  display: flex;
  justify-content: space-between;
  align-items: center; 
`

const BookRequest = styled.a`
  width: 80px;
  height: 27px;

  font-weight: 700;
  color: black;
  text-decoration: none;

`

const FindFavoriteBooks = styled.a`
  width: 156px;
  height: 27px;

  font-weight: 700;
  color: black;
  text-decoration: none;
`

const MyPage = styled.a`
  width: 100px;
  height: 27px;

  font-weight: 700;
  color: black;
  text-decoration: none;
`

const TextContent = styled.div`
  width: 226px;
  height: 45px;
  margin-right: 240px;
  margin-top: 26px;
  margin-bottom: 25px;
  
  display: flex;
  justify-content: space-around; /* Fixed typo from "jestify-content" */
  align-items: center; /* Added to vertically center content */
`

const LogInContent = styled.div`
  width: 85px;
  height: 25px;
  display: flex; 
  align-items: center; 
  gap: 5px; 
`

const SignUpContent = styled.div`
  width: 99px;
  height: 24px;
  display: flex; 
  align-items: center; 
  gap: 5px; 
`

const User = styled.img` 
  
`

const LogInText = styled.a`
  width: 70px;
  height: 24px;
  color: #00C471; 
  text-decoration: none;
`

const SignUpText = styled.a`
  width: 60px;
  height: 24px;
  color: #00C471;
  text-decoration: none;
`

const Home = styled.img`
  
`


export default Header

