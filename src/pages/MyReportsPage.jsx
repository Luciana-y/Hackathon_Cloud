import { useEffect, useState } from "react";
import { getMyReports } from "../api/reports";
import ReportList from "../components/ReportList";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/NavBar";

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

  if (!user)
    return (
      <p className="text-center text-red-500 font-semibold mt-6">
        Debes iniciar sesión
      </p>
    );

  if (loading)
    return <p className="text-center mt-6 text-[#1a3a6d] font-semibold">Cargando...</p>;

  if (error)
    return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Navbar />
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-[#1a3a6d] text-center">
          Mis Reportes
        </h1>

        <ReportList reports={reports} />
      </div>
    </div>
  );
}
