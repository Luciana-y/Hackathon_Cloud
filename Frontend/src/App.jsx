import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminReportsPage from "./pages/AdminReportsPage";
import RegisterPage from "./pages/RegisterPage";
import DetailReportPage from "./pages/ReportDetailPage";
import ProfilePage from "./pages/ProfilePage";
import ReportsPage from "./pages/ReportsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/reports" element={<AdminReportsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reports/:id" element={<DetailReportPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
