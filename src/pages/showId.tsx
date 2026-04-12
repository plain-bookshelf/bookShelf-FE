import { useLocation, useNavigate } from "react-router-dom";
import { Result } from "../components/auth/idFind/result";

// 아이디 찾기 결과 화면은 앞 단계에서 전달된 route state를 표시만 담당한다.
export default function ShowId() {
  const navigate = useNavigate();
  const location = useLocation();
  const foundId = location.state?.found ?? "";

  return <Result foundId={foundId} onConfirm={() => navigate("/login")} />;
}
