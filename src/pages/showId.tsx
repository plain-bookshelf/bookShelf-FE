import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Result } from "../features/auth/idFind/result";

/**
 * 아이디 찾기 결과 페이지
 *
 * 이전 단계(idFind)에서 찾은 아이디를 route state로 전달받아 보여 준다.
 * 사용자가 직접 URL로 진입해 state가 비어 있으면 결과를 보여 줄 수 없으므로
 * 로그인 페이지로 되돌린다.
 */
export default function ShowId() {
  const navigate = useNavigate();
  const location = useLocation();
  const foundId = location.state?.found ?? "";

  if (!foundId) {
    return <Navigate to="/login" replace />;
  }

  return <Result foundId={foundId} onConfirm={() => navigate("/login")} />;
}

