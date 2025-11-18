const API_URL = import.meta.env.VITE_API_URL;

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  };
}

export async function createReport(payload) {
  const res = await fetch(`${API_URL}/reports`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function getMyReports() {
  const res = await fetch(`${API_URL}/reports/me`, {
    headers: getAuthHeaders()
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function getReports(status = "PENDIENTE") {
  const res = await fetch(`${API_URL}/reports?status=${status}`, {
    headers: getAuthHeaders()
  });

  const data = await res.json();
  if (!res.ok) {
    const errorMsg = data.error || `Error ${res.status}: ${res.statusText}`;
    throw new Error(errorMsg);
  }
  return data;
}

export async function updateReport(id, payload) {
  const res = await fetch(`${API_URL}/reports/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function getReportHistory(id) {
  const res = await fetch(`${API_URL}/reports/${id}/history`, {
    headers: getAuthHeaders()
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

// Obtener todos los reportes activos (para admin)
export async function getAllActiveReports() {
  const res = await fetch(`${API_URL}/reports?status=ACTIVO`, {
    headers: getAuthHeaders()
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

// Priorizar un reporte (cambiar urgencia)
export async function prioritizeReport(id, urgencia) {
  return updateReport(id, { urgencia });
}

// Cerrar un reporte (cambiar estado a RESUELTO)
export async function closeReport(id) {
  return updateReport(id, { estado: "RESUELTO" });
}
