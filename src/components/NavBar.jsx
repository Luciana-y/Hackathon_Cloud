// components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  // Ejemplo de chequeo de rol: el payload del JWT puede tener:
  // { role: 'estudiante' }  OR  { roles: ['estudiante', ...] }
  const isEstudiante =
    user &&
    (user.role === "estudiante" ||
     user.role === "estudaine" /* por si el backend tiene ese valor extraño */ ||
     (Array.isArray(user.roles) && user.roles.includes("estudiante")) ||
     (Array.isArray(user.roles) && user.roles.includes("estudaine"))
    );

  // Verificar si es admin o authority (tienen el mismo nivel)
  const isAdminOrAuthority =
    user &&
    (user.rol === "admin" ||
     user.rol === "authority" ||
     user.rol === "administrador" ||
     user.role === "admin" ||
     user.role === "authority" ||
     user.role === "administrador" ||
     (Array.isArray(user.roles) &&
       (user.roles.includes("admin") ||
        user.roles.includes("authority") ||
        user.roles.includes("administrador"))));

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>
        <Link to="/profile" style={styles.logo}>AlertaUtec</Link>
        </h2>

      {user && (
        <div style={styles.menu}>
          {isAdminOrAuthority && (
            <Link to="/admin/dashboard" style={styles.link}>
              Panel Admin
            </Link>
          )}
          <Link to="/reports/new" style={styles.link}>Reportar Incidente</Link>
          <Link to="/reports/me" style={styles.link}>Ver mis Reportes</Link>
        </div>
      )}

      <div>
        {user ? (
          <button style={styles.logout} onClick={handleLogout}>Cerrar Sesión</button>
        ) : (
          <button style={styles.logout} onClick={() => navigate("/")}>Iniciar sesión</button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#153b78",
    padding: "18px 40px",
    borderRadius: "10px 10px 0 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
  },
  logo: {
    fontSize: "30px",
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
  },
  menu: {
    display: "flex",
    gap: "35px",
    marginLeft: "80px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "600",
  },
  logout: {
    backgroundColor: "#d9534f",
    border: "none",
    color: "white",
    padding: "8px 14px",
    fontSize: "15px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
