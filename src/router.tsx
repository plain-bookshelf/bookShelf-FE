import { BrowserRouter, Routes, Route } from "react-router-dom";
import My from "./pages/Mypage";
import Main from "./pages/Main";
import Layout from "./layouts/Layout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/My" element={<My />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}