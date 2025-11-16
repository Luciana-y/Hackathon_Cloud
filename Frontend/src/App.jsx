import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminReportsPage from "./pages/AdminReportsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/reports" element={<AdminReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
