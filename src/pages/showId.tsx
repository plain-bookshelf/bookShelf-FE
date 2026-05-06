import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Result } from "../features/auth/idFind/result";

export default function ShowId() {
  const navigate = useNavigate();
  const location = useLocation();
  const foundId = location.state?.found ?? "";

  if (!foundId) {
    return <Navigate to="/login" replace />;
  }

  return <Result foundId={foundId} onConfirm={() => navigate("/login")} />;
}
