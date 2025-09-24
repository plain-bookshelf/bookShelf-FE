import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Mypage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/My" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}