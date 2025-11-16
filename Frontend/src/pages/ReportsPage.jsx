import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await apiFetch("/reports/me");
      setReports(res);
    }
    load();
  }, []);

  return (
    <div>
      <h1>Mis Reportes</h1>
      {reports.map(r => (
        <div key={r.id}>
          <h3>{r.tipo}</h3>
          <p>{r.descripcion}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
