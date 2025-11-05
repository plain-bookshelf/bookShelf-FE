import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import My from "./pages/Mypage";
import Main from "./pages/Main";
import Login from "./pages/login";
import EmailRegistration from "./pages/emailRegistration";
import Singup from "./pages/singup"
import IdPasswordFind from "./pages/idPasswordFind";
import IdFind from "./pages/idFind"
import CheckEmailPwReset from "./pages/checkEmailPwReset";
import BookDetail from "./pages/BookDetail";
import ShowId from "./pages/showId"
import PwReset from "./pages/pwReset";
import ShowPw from "./pages/showPw";
import MyPwReset from "./pages/myPwReset";


import My from "./pages/Mypage";
import Main from "./pages/Main";
import Layout from "./layouts/Layout";
import RecommandList from "./pages/Recommand";

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
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/my" element={<My />} />
          <Route path="/recommand" element={<RecommandList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}