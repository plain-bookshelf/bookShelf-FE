import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import styled from "styled-components";

const Layout = () => {
  return (
    <>
    <Wrapper>
      <Header />
      <Outlet />
      <Footer />
    </Wrapper>
    </>
  );
};

export default Layout;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1910px;
  margin: 0 auto;
  box-sizing: border-box;
`;