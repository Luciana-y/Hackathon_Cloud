import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();          // limpia el usuario
    navigate("/");     // redirige al login
  }

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>AlertaUTEC</h2>

      {user && (
        <div style={styles.menu}>
          <a href="/dashboard" style={styles.link}>Inicio</a>
          <a href="/report" style={styles.link}>Reportar Incidente</a>
          <a href="/my-reports" style={styles.link}>Ver mis Reportes</a>
        </div>
      )}

      <button style={styles.logout} onClick={handleLogout}>
        Cerrar Sesión
      </button>
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
    fontSize: "22px",
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
