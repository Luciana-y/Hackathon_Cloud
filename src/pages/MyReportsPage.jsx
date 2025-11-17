import { useEffect, useState } from "react";
import { getMyReports } from "../api/reports";
import ReportList from "../components/ReportList";
import { useAuth } from "../context/AuthContext";  // <-- ESTE

export default function MyReportsPage() {
  const { user } = useAuth();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReports() {
      try {
        setLoading(true);
        const data = await getMyReports();
        setReports(data);
      } catch (err) {
        setError(err.message || "Error al cargar reportes");
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  if (!user) return <p className="text-center text-red-500 font-semibold mt-6">Debes iniciar sesión</p>;
  if (loading) return <p className="text-center mt-6">Cargando...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-[#153b78] text-center">
          Mis Reportes
        </h1>

        <ReportList reports={reports} />
      </div>
    </div>
  );
}
