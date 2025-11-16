import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../api/api";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({ correo, password })
      });
      login(res.token);
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button type="submit">Ingresar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
