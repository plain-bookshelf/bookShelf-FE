import { useNavigate } from "react-router-dom";
import { Intro } from "../components/auth/idFind/intro";

// 아이디/비밀번호 찾기 진입 화면은 실제 찾기 플로우 시작점을 안내하는 역할만 한다.
export default function IdPasswordFind() {
  const navigate = useNavigate();
  return <Intro onStart={() => navigate("/idFind")} />;
}
