import { useState } from "react";
import "../styles/ReportCard.css";
import { prioritizeReport, closeReport } from "../api/reports";

export default function AdminReportItem({ report, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePrioritize(newUrgencia) {
    try {
      setLoading(true);
      setError("");
      await prioritizeReport(report.reporte_id, newUrgencia);
      onUpdate?.();
    } catch (err) {
      setError(err.message || "Error al priorizar reporte");
    } finally {
      setLoading(false);
    }
  }

  async function handleClose() {
    if (!confirm("¿Estás seguro de que deseas cerrar este reporte?")) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      await closeReport(report.reporte_id);
      onUpdate?.();
    } catch (err) {
      setError(err.message || "Error al cerrar reporte");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="report-card admin-report-card">
      {/* Imagen */}
      {report.imagen ? (
        <img src={report.imagen} alt="" className="report-image" />
      ) : (
        <div className="report-image"></div>
      )}

      <div className="report-body">
        {/* Fila superior */}
        <div className="report-top-row">
          <span className="report-category">{report.tipo}</span>
          <span
            className={`urgencia ${
              report.urgencia === "ALTA"
                ? "alta"
                : report.urgencia === "MEDIA"
                ? "media"
                : "baja"
            }`}
          >
            {report.urgencia}
          </span>
        </div>

        {/* Estado */}
        <div className="report-status-row">
          <span className={`status-badge status-${report.estado?.toLowerCase() || "pendiente"}`}>
            {report.estado || "PENDIENTE"}
          </span>
        </div>

        {/* Descripción */}
        <p className="report-desc">{report.descripcion}</p>

        {/* Footer con ID */}
        <div className="report-footer">ID: {report.reporte_id}</div>

        {/* Mensaje de error */}
        {error && <div className="error-message">{error}</div>}

        {/* Acciones administrativas */}
        <div className="admin-actions">
          <div className="priority-actions">
            <label className="priority-label">Prioridad:</label>
            <div className="priority-buttons">
              <button
                className={`priority-btn ${report.urgencia === "BAJA" ? "active" : ""}`}
                onClick={() => handlePrioritize("BAJA")}
                disabled={loading || report.urgencia === "BAJA"}
              >
                Baja
              </button>
              <button
                className={`priority-btn ${report.urgencia === "MEDIA" ? "active" : ""}`}
                onClick={() => handlePrioritize("MEDIA")}
                disabled={loading || report.urgencia === "MEDIA"}
              >
                Media
              </button>
              <button
                className={`priority-btn ${report.urgencia === "ALTA" ? "active" : ""}`}
                onClick={() => handlePrioritize("ALTA")}
                disabled={loading || report.urgencia === "ALTA"}
              >
                Alta
              </button>
            </div>
          </div>

          <button
            className="close-btn"
            onClick={handleClose}
            disabled={loading || report.estado === "RESUELTO"}
          >
            {loading ? "Procesando..." : "Cerrar Reporte"}
          </button>
        </div>
      </div>
    </div>
  );
}

