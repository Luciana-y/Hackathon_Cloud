import ReportItem from "./ReportItem";
import "../styles/ReportCard.css";

export default function ReportList({ reports }) {
  if (!reports.length)
    return <p className="text-center">No hay reportes</p>;

  return (
    <div className="report-grid">
      {reports.map((r) => (
        <ReportItem key={r.reporte_id} report={r} />
      ))}
    </div>
  );
}
