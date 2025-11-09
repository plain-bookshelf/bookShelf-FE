import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import My from "./pages/Mypage";
import Main from "./pages/Main";
import Login from "./pages/login";
import EmailRegistration from "./pages/emailRegistration";
import Signup from "./pages/SignUp"
import IdPasswordFind from "./pages/idPasswordFind";
import IdFind from "./pages/idFind"
import CheckEmailPwReset from "./pages/checkEmailPwReset";
import BookDetail from "./pages/BookDetail";
import ShowId from "./pages/showId"
import PwReset from "./pages/pwReset";
import ShowPw from "./pages/showPw";
import MyPwReset from "./pages/myPwReset";
import RecommandList from "./pages/Recommand";
import ChatBot from "./pages/chatBot";
import AllowList from "./pages/borrowAllow";
import BorrowList from "./pages/borrowList";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={<Main />} />
          <Route path="/My" element={<My />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/emailRegistration" element={<EmailRegistration/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/idPasswordFind" element={<IdPasswordFind/>}/>
          <Route path="/idFind" element={<IdFind/>}/>
          <Route path="/showId" element={<ShowId/>}/>
          <Route path="/pwReset" element={<PwReset/>}/>
          <Route path="/checkEmailPwReset" element={<CheckEmailPwReset/>}/>
          <Route path="/book/:bookId" element={<BookDetail/>}/>
          {/* <Route path="/bookDetail" element={<BookDetail/>}/> */}
          <Route path="/showPw" element={<ShowPw/>}/>
          <Route path="/MyPwReset" element={<MyPwReset/>}/>
          <Route path="/recommand" element={<RecommandList />} />
          <Route path="/AI" element={<ChatBot />} />
          <Route path="allow" element={<AllowList />} />
          <Route path="list" element={<BorrowList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}