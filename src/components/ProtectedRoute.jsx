import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user } = useAuth();

  // Si no hay usuario, redirigir al login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si requiere admin, verificar rol (admin = authority tienen el mismo nivel)
  if (requireAdmin) {
    const isAdminOrAuthority =
      user.rol === "admin" ||
      user.rol === "authority" ||
      user.rol === "administrador" ||
      user.role === "admin" ||
      user.role === "authority" ||
      user.role === "administrador" ||
      (Array.isArray(user.roles) &&
        (user.roles.includes("admin") ||
         user.roles.includes("authority") ||
         user.roles.includes("administrador")));

    if (!isAdminOrAuthority) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

