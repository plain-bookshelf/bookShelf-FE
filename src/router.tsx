import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin";
import CheckEmailPwReset from "./pages/checkEmailPwReset";
import EmailRegistration from "./pages/emailRegistration";
import IdFind from "./pages/idFind";
import IdPasswordFind from "./pages/idPasswordFind";
import Login from "./pages/logIn";
import PwReset from "./pages/pwReset";
import ShowId from "./pages/showId";
import ShowPw from "./pages/showPw";
import Signup from "./pages/SignUp";
import ProtectedRouter from "./protectedRouter";

/**
 * 앱 전체 라우터
 *
 * 현재는 auth와 admin에서 실제로 사용하는 화면만 연결한다.
 * 이미지 누락으로 비활성화한 예전 페이지들은 Legacy 폴더로 이동했고,
 * 그에 맞춰 라우터에서도 제거했다.
 */
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/showPw" element={<ShowPw />} />
        <Route path="/checkEmailPwReset" element={<CheckEmailPwReset />} />
        <Route path="/emailRegistration" element={<EmailRegistration />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/idPasswordFind" element={<IdPasswordFind />} />
        <Route path="/idFind" element={<IdFind />} />
        <Route path="/showId" element={<ShowId />} />
        <Route path="/pwReset" element={<PwReset />} />
        <Route element={<ProtectedRouter />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
