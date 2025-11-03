import { BrowserRouter, Routes, Route } from "react-router-dom";
import My from "./pages/Mypage";
import Main from "./pages/Main";
import RecommandList from "./pages/Recommand";
import Layout from "./layouts/Layout";
import ChatBot from "./pages/chatBot";
import AllowList from "./pages/borrowAllow";
import BorrowList from "./pages/borrowList";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Main />} />
          <Route path="/my" element={<My />} />
          <Route path="/recommand" element={<RecommandList />} />
          <Route path="/chat" element={<ChatBot />} />
          <Route path="/allow" element={<AllowList />} />
          <Route path="/list" element={<BorrowList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}