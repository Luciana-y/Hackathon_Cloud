import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await apiFetch("/users/me");
      setProfile(res);
    }
    load();
  }, []);

  if (!profile) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Mi Perfil</h1>
      <p><b>Nombre:</b> {profile.nombre}</p>
      <p><b>Correo:</b> {profile.correo}</p>
    </div>
  );
}
