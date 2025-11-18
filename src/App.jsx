import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import AdminDashboard from "./pages/AdminDashboard";
import CreateReportPage from "./pages/CreateReportPage";

import MyReportsPage from "./pages/MyReportsPage";
import EditReportPage from "./pages/EditReportPage";
import ReportHistoryPage from "./pages/ReportHistoryPage";

import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Reports */}
        <Route path="/reports/me" element={<MyReportsPage />} />
        <Route path="/reports/new" element={<CreateReportPage />} />
        <Route path="/reports/:id/edit" element={<EditReportPage />} />
        <Route path="/reports/:id/history" element={<ReportHistoryPage />} />

        {/* Perfil */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />


        {/* SIEMPRE ÚLTIMO */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
