import { useNavigate } from "react-router-dom";
import { Success } from "../components/auth/pwFind/success";

// 비밀번호 변경 완료 화면은 다시 로그인으로 보내는 마지막 확인 단계다.
export default function ShowPw() {
  const navigate = useNavigate();

  return <Success onConfirm={() => navigate("/login")} />;
}
