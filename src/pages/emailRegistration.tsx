import { Navigate } from "react-router-dom";

// 이메일 등록 전용 경로는 현재 회원가입 첫 단계와 동일하므로 signup으로 모은다.
export default function EmailRegistration() {
  return <Navigate to="/signup" replace />;
}
