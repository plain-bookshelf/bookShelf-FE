import { BrowserRouter, Routes, Route } from "react-router-dom";
import My from "./pages/Mypage";
import Main from "./pages/Main";
import Layout from "./layouts/Layout";
import RecommandList from "./pages/Recommand";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/my" element={<My />} />
          <Route path="/recommand" element={<RecommandList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}