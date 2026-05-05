import { useNavigate } from "react-router-dom";
import { Success } from "../features/auth/pwFind/success";

export default function ShowPw() {
  const navigate = useNavigate();

  return <Success onConfirm={() => navigate("/login")} />;
}

