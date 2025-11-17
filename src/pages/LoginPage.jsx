import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(correo, password);
      navigate("/dashboard"); 
    } catch (err) {
      setError(err.message || "Credenciales incorrectas");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#1a3a6d" }}>
          Bienvenido a AlertaUTEC 
        </h1>
        <div style={{ marginBottom: "25px", textAlign: "center", color: "#242323ff", fontWeight: "600"}}>
          <label>Inicia sesión para continuar</label>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "8px", fontWeight: "600" }}>Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                outline: "none",
                transition: "0.2s",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "8px", fontWeight: "600" }}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                outline: "none",
                transition: "0.2s",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "14px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#1a3a6d",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#15305c")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1a3a6d")}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "15px", fontWeight: "500" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
