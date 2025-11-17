import "../styles/ReportCard.css";

export default function ReportItem({ report }) {
  return (
    <div className="report-card">

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

        {/* Descripción */}
        <p className="report-desc">{report.descripcion}</p>

        {/* Footer */}
        <div className="report-footer">ID: {report.reporte_id}</div>
      </div>
    </div>
  );
}
