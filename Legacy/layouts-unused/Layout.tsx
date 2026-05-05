import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../shared/header/Header";
import AdminHeader from "../shared/header/adminHeader";
import Footer from "../shared/footer/Footer";
import { useUser } from "../shared/contexts/UserContext";
import { getMyPage } from "../api/my";
import { getUserId } from "../utils/tokenService";
import { getUserRoleFromToken, type UserRole } from "../utils/getUserFromToken";

const Layout = () => {
  const { user, setUser } = useUser();
  const [role, setRole] = useState<UserRole>(null);

  useEffect(() => {
    const userRole = getUserRoleFromToken();
    setRole(userRole);

    const id = user.id || getUserId();
    if (!id) {
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await getMyPage(id);
        const data = res.data.data;

        setUser((prevUser) => ({
          ...prevUser,
          id,
          nickName: data.nick_name,
          img: data.profile,
          email: data.address ?? prevUser.email,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [setUser, user.id]);

  const renderHeader = () => {
    if (role === "MANAGER" || role === "ADMIN") {
      return <AdminHeader />;
    }

    return <Header />;
  };

  return (
    <Wrapper>
      {renderHeader()}
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  width: 100%;
  max-width: var(--desktop-max-width);
  min-height: 100vh;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

