export default function ReportItem({ report }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-xl transition-all duration-300">

      {/* Título + Urgencia */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-[#153b78]">
          {report.tipo}
        </h2>

        <span
          className={`
            px-3 py-1 text-xs rounded-full font-semibold
            ${
              report.urgencia === "ALTA"
                ? "bg-red-100 text-red-600"
                : report.urgencia === "MEDIA"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }
          `}
        >
          {report.urgencia}
        </span>
      </div>

      {/* Descripción */}
      <p className="text-gray-700 text-sm leading-relaxed">
        {report.descripcion}
      </p>

      {/* Footer */}
      <div className="flex justify-end mt-4">
        <span className="text-xs text-gray-400">
          ID: {report.reporte_id}
        </span>
      </div>
    </div>
  );
}
