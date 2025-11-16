import { useEffect, useContext, useState } from "react";
import { connectWebSocket } from "../websocket/ws";
import { AuthContext } from "../context/AuthContext";

export default function AdminReportsPage() {
  const { user } = useContext(AuthContext);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    if (!user) return;

    const ws = connectWebSocket(user.role, user.id, (msg) => {
      console.log("📩 WS Mensaje recibido:", msg);

      if (msg.type === "report_update") {
        setUpdates((prev) => [msg.payload, ...prev]); // lo agregamos a la lista
      }
    });

    return () => ws.close();
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel del Administrador</h1>
      <h2>Actualizaciones en tiempo real de reportes</h2>

      {updates.length === 0 && <p>No hay notificaciones todavía...</p>}

      {updates.map((r, i) => (
        <div key={i} style={{ padding: "10px", border: "1px solid #ccc", marginTop: "10px" }}>
          <strong>Reporte ID:</strong> {r.reporte_id} <br />
          <strong>Estado:</strong> {r.estado} <br />
          <strong>Tipo:</strong> {r.tipo} <br />
          <strong>Descripción:</strong> {r.descripcion}
        </div>
      ))}
    </div>
  );
}
