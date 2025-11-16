import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function DetailReportPage() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  // 1. Obtener detalle del reporte (si tienes el endpoint GET /reports/{id})
  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch(
          `https://TU-API.execute-api.us-east-1.amazonaws.com/reports/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (res.ok) setReport(data);
        else setError(data.error || "No se pudo cargar el reporte.");

      } catch (e) {
        setError("Error al obtener reporte.");
      }
    }

    fetchReport();
  }, [id, token]);

  // 2. Obtener historial del reporte (tu endpoint GET /reports/{id}/history)
  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch(
          `https://TU-API.execute-api.us-east-1.amazonaws.com/reports/${id}/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (res.ok) setHistory(data);
        else setError(data.error || "No se pudo cargar historial.");
      } catch (e) {
        setError("Error al obtener historial.");
      }
    }

    fetchHistory();
  }, [id, token]);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Detalle del Reporte</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!report ? (
        <p>Cargando reporte...</p>
      ) : (
        <div>
          <h2>{report.tipo}</h2>
          <p><strong>Estado:</strong> {report.estado}</p>
          <p><strong>Urgencia:</strong> {report.urgencia}</p>
          <p><strong>Descripción:</strong> {report.descripcion}</p>
          <p><strong>Creado por:</strong> {report.creadoPor}</p>
        </div>
      )}

      <hr />

      <h2>Historial</h2>

      {history.length === 0 ? (
        <p>No hay historial registrado.</p>
      ) : (
        <ul>
          {history.map((h, i) => (
            <li key={i}>
              <p><strong>Fecha:</strong> {h.timestamp}</p>
              <p><strong>Acción:</strong> {h.action}</p>
              <p><strong>Realizado por:</strong> {h.by}</p>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
