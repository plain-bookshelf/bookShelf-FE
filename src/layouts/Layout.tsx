import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import AdminHeader from "../components/header/adminHeader";
import Footer from "../components/footer/Footer";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getUserRoleFromToken, type UserRole } from "../utils/getUserFromToken";

const Layout = () => {
  const [role, setRole] = useState<UserRole>(null);

  useEffect(() => {
    const userRole = getUserRoleFromToken();
    setRole(userRole);
  }, []);

  const renderHeader = () => {
    if (role === "MANAGER" || role === "ADMIN") {
      return <AdminHeader />;
    }
    // 기본: USER 또는 비로그인 → 일반 Header
    return <Header />;
  };

  return (
    <Wrapper>
      {renderHeader()}
      <Outlet />
      <Footer />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1910px;
  margin: 0 auto;
  box-sizing: border-box;
`;