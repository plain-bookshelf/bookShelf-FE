import { BrowserRouter, Routes, Route } from "react-router-dom";
import My from "./pages/Mypage";
import Main from "./pages/Main";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/My" element={<My />} />
      </Routes>
    </BrowserRouter>
  );
}