import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { connectWebSocket } from "../api/websocket";
import { getReports } from "../api/reports";
import AdminReportItem from "../components/AdminReportItem";
import Navbar from "../components/NavBar";
import "../styles/ReportCard.css";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wsConnected, setWsConnected] = useState(false);

  // Filtros
  const [filterStatus, setFilterStatus] = useState("TODOS");
  const [filterUrgencia, setFilterUrgencia] = useState("TODAS");
  const [filterTipo, setFilterTipo] = useState("TODOS");

  // Cargar reportes y conectar WebSocket
  useEffect(() => {
    if (!user) return;

    loadReports();

    // Conectar WebSocket
    const socket = connectWebSocket({
      rol: user.rol || user.role || "admin",
      userId: user.userId || user.id || user.sub,
      onMessage: (data) => {
        console.log("Reporte actualizado en tiempo real:", data);
        // Recargar reportes cuando hay una actualización
        loadReports();
      },
      onOpen: () => {
        setWsConnected(true);
        console.log("WebSocket conectado");
      },
      onClose: () => {
        setWsConnected(false);
        console.log("WebSocket desconectado");
      },
      onError: (err) => {
        console.error("Error en WebSocket:", err);
        setWsConnected(false);
      },
    });

    return () => {
      socket.close();
    };
  }, [user]);

  // Aplicar filtros cuando cambian los reportes o los filtros
  useEffect(() => {
    let filtered = [...reports];

    // Filtro por estado
    if (filterStatus !== "TODOS") {
      filtered = filtered.filter((r) => r.estado === filterStatus);
    }

    // Filtro por urgencia
    if (filterUrgencia !== "TODAS") {
      filtered = filtered.filter((r) => r.urgencia === filterUrgencia);
    }

    // Filtro por tipo
    if (filterTipo !== "TODOS") {
      filtered = filtered.filter((r) => r.tipo === filterTipo);
    }

    setFilteredReports(filtered);
  }, [reports, filterStatus, filterUrgencia, filterTipo]);

  async function loadReports() {
    try {
      setLoading(true);
      setError("");

      // Intentar obtener reportes pendientes primero (estado por defecto)
      let data;
      try {
        data = await getReports("PENDIENTE");
      } catch (err) {
        console.warn("Error obteniendo reportes PENDIENTE:", err);
        // Si falla, intentar con otros estados comunes
        const estados = ["ACTIVO", "EN_PROGRESO", "RESUELTO"];
        let encontrado = false;
        for (const estado of estados) {
          try {
            data = await getReports(estado);
            encontrado = true;
            break;
          } catch (e) {
            console.warn(`Error obteniendo reportes ${estado}:`, e);
            continue;
          }
        }
        if (!encontrado) {
          // Si todo falla, intentar sin especificar estado (usará el default)
          try {
            data = await getReports();
          } catch (err3) {
            throw new Error("No se pudieron cargar los reportes. Verifica tu conexión y permisos.");
          }
        }
      }

      setReports(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Error al cargar reportes");
      console.error("Error cargando reportes:", err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  }

  function handleReportUpdate() {
    // Recargar reportes después de una actualización
    loadReports();
  }

  // Obtener tipos únicos para el filtro
  const tiposUnicos = [...new Set(reports.map((r) => r.tipo))].filter(Boolean);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Navbar />
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#1a3a6d]">
            Panel Administrativo
          </h1>
          <div className="flex items-center gap-3">
            <div
              className={`ws-indicator ${wsConnected ? "connected" : "disconnected"}`}
              title={wsConnected ? "Conectado en tiempo real" : "Desconectado"}
            >
              <span className="ws-dot"></span>
              {wsConnected ? "En tiempo real" : "Sin conexión"}
            </div>
            <button
              onClick={loadReports}
              className="refresh-btn"
              disabled={loading}
            >
              {loading ? "Cargando..." : "🔄 Actualizar"}
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="filters-panel mb-6">
          <h2 className="text-xl font-semibold mb-4 text-[#1a3a6d]">Filtros</h2>
          <div className="filters-grid">
            {/* Filtro por Estado */}
            <div className="filter-group">
              <label className="filter-label">Estado:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="TODOS">Todos</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="ACTIVO">Activo</option>
                <option value="EN_PROGRESO">En Progreso</option>
                <option value="RESUELTO">Resuelto</option>
              </select>
            </div>

            {/* Filtro por Urgencia */}
            <div className="filter-group">
              <label className="filter-label">Urgencia:</label>
              <select
                value={filterUrgencia}
                onChange={(e) => setFilterUrgencia(e.target.value)}
                className="filter-select"
              >
                <option value="TODAS">Todas</option>
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>

            {/* Filtro por Tipo */}
            <div className="filter-group">
              <label className="filter-label">Tipo:</label>
              <select
                value={filterTipo}
                onChange={(e) => setFilterTipo(e.target.value)}
                className="filter-select"
              >
                <option value="TODOS">Todos</option>
                {tiposUnicos.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón para limpiar filtros */}
            <div className="filter-group">
              <button
                onClick={() => {
                  setFilterStatus("TODOS");
                  setFilterUrgencia("TODAS");
                  setFilterTipo("TODOS");
                }}
                className="clear-filters-btn"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="stats-panel mb-6">
          <div className="stat-card">
            <span className="stat-label">Total de Reportes:</span>
            <span className="stat-value">{reports.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Filtrados:</span>
            <span className="stat-value">{filteredReports.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Pendientes:</span>
            <span className="stat-value">
              {reports.filter((r) => r.estado === "PENDIENTE").length}
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Alta Urgencia:</span>
            <span className="stat-value alta">
              {reports.filter((r) => r.urgencia === "ALTA").length}
            </span>
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="error-banner mb-4">{error}</div>
        )}

        {/* Lista de reportes */}
        {loading ? (
          <p className="text-center mt-6 text-[#1a3a6d] font-semibold">
            Cargando reportes...
          </p>
        ) : filteredReports.length === 0 ? (
          <p className="text-center mt-6 text-gray-500">
            No hay reportes que coincidan con los filtros seleccionados.
          </p>
        ) : (
          <div className="report-grid">
            {filteredReports.map((report) => (
              <AdminReportItem
                key={report.reporte_id}
                report={report}
                onUpdate={handleReportUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
