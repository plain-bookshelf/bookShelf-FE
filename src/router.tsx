import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import My from "./pages/Mypage";
import Main from "./pages/Main";
import Login from "./pages/Login";
import EmailRegistration from "./pages/EmailRegistration";
import Singup from "./pages/SignUp"
import IdPasswordFind from "./pages/IdPasswordFind";
import IdFind from "./pages/IdFind"
import CheckEmailPwReset from "./pages/CheckEmailPwReset";
import BookDetail from "./pages/BookDetail";
import ShowId from "./pages/ShowId"
import PwReset from "./pages/PwReset";
import ShowPw from "./pages/ShowPw";
import MyPwReset from "./pages/MyPwReset";


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Main />} />
          <Route path="/My" element={<My />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/emailRegistration" element={<EmailRegistration/>}/>
          <Route path="/signup" element={<Singup/>}/>
          <Route path="/idPasswordFind" element={<IdPasswordFind/>}/>
          <Route path="/idFind" element={<IdFind/>}/>
          <Route path="/showId" element={<ShowId/>}/>
          <Route path="/pwReset" element={<PwReset/>}/>
          <Route path="/checkEmailPwReset" element={<CheckEmailPwReset/>}/>
          <Route path="/bookdetail" element={<BookDetail/>}/>
          <Route path="/showPw" element={<ShowPw/>}/>
          <Route path="/MyPwReset" element={<MyPwReset/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}