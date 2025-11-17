import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    numero_telefonico: ""
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      await register(form);
      setMsg("Registro exitoso. Redirigiendo al login...");
      
      // 🔥 Esperamos un pequeño tiempo para que el usuario vea el mensaje
      setTimeout(() => navigate("/"), 1200);

    } catch (err) {
      setMsg(err.message || "Error en el registro.");
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
        padding: "20px"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "400px"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#1a3a6d"
          }}
        >
          Crear Cuenta
        </h2>

        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "8px", fontWeight: "600" }}>
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "8px", fontWeight: "600" }}>
              Correo institucional
            </label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              placeholder="nombre.apellido@utec.edu.pe"
              required
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "8px", fontWeight: "600" }}>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "8px", fontWeight: "600" }}>
              Número telefónico
            </label>
            <input
              type="text"
              name="numero_telefonico"
              value={form.numero_telefonico}
              onChange={handleChange}
              required
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem"
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
              transition: "0.3s"
            }}
          >
            {loading ? "Registrando..." : "Registrarme"}
          </button>
        </form>

        {msg && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              fontWeight: "500",
              color: msg.includes("exitoso") ? "green" : "red"
            }}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
