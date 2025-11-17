import { useState } from "react";
import { createReport } from "../api/reports";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar"; // Asegúrate que exista
import Button from "../components/Button";

export default function CreateReportPage() {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState("General");
  const [urgencia, setUrgencia] = useState("BAJA");
  const [descripcion, setDescripcion] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);

    try {
      await createReport({ tipo, urgencia, descripcion });
      setMsg("Reporte creado correctamente ✔");

      // Reset form
      setTipo("General");
      setUrgencia("BAJA");
      setDescripcion("");
    } catch (err) {
      setError(err.message || "Error al crear reporte");
    }

    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENEDOR CENTRAL */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#1a3a6d",
            }}
          >
            Crear Reporte
          </h1>

          <p
            style={{
              textAlign: "center",
              marginBottom: "25px",
              color: "#242323ff",
              fontWeight: "600",
            }}
          >
            Completa la información del incidente
          </p>

          {/* FORMULARIO */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Tipo */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginBottom: "8px", fontWeight: "600" }}>
                Tipo de reporte
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                }}
              >
                <option>General</option>
                <option>Infraestructura</option>
                <option>Sistema</option>
                <option>Seguridad</option>
                <option>Otros</option>
              </select>
            </div>

            {/* Urgencia */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginBottom: "8px", fontWeight: "600" }}>
                Urgencia
              </label>
              <select
                value={urgencia}
                onChange={(e) => setUrgencia(e.target.value)}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                }}
              >
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>

            {/* Descripción */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginBottom: "8px", fontWeight: "600" }}>
                Descripción
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describe el problema..."
                required
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                  minHeight: "120px",
                }}
              />
            </div>

            {/* Botón */}
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
              }}
            >
              {loading ? "Creando..." : "Crear reporte"}
            </button>
          </form>

          {/* MENSAJES */}
          {msg && (
            <p
              style={{
                color: "green",
                textAlign: "center",
                marginTop: "15px",
                fontWeight: "500",
              }}
            >
              {msg}
            </p>
          )}

          {error && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                marginTop: "15px",
                fontWeight: "500",
              }}
            >
              {error}
            </p>
          )}

          {/* Botón extra */}
          <Button onClick={() => navigate("/reports/me")}>
            Ver mis reportes
          </Button>
        </div>
      </div>
    </div>
  );
}
