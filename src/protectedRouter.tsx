import { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "./utils/tokenService";

/**
 * 보호 라우터
 *
 * 로그인이 필요한 페이지를 감싸는 라우터 컴포넌트다.
 * access token이 없으면 로그인 페이지로 돌려보낸다.
 */
function ProtectedRouter() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const location = useLocation();
  const hasAlerted = useRef(false);

  /**
   * 기존 구현은 render 중에 alert를 호출하고 있었는데,
   * React에서는 render 단계 부작용이 반복 실행될 수 있어 안전하지 않다.
   *
   * 그래서 화면 이동이 필요한 경우에만 effect에서 한 번 알림을 띄우도록 바꾼다.
   */
  useEffect(() => {
    if (!accessToken && !hasAlerted.current) {
      hasAlerted.current = true;
      window.alert("해당 서비스는 로그인을 한 후 사용 가능합니다.");
    }
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export default ProtectedRouter;
