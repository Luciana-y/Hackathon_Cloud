const API_URL = import.meta.env.VITE_API_URL;

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}


export async function getMe() {
  const res = await fetch(`${API_URL}/users/me`, {
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}


export async function updateMe(payload) {
  const res = await fetch(`${API_URL}/users/me`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}
