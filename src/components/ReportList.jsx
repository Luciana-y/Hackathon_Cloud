import ReportItem from "./ReportItem";

export default function ReportList({ reports }) {
  if (!reports.length)
    return <p className="text-gray-500 text-center mt-4">No hay reportes</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
      {reports.map((r) => (
        <ReportItem key={r.reporte_id} report={r} />
      ))}
    </div>
  );
}
