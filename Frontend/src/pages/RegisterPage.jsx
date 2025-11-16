import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    numero_telefonico: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("https://TU-API.execute-api.us-east-1.amazonaws.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 201) {
        setMsg("Registro exitoso. Ya puedes iniciar sesión.");
      } else {
        setMsg(data.error || "Error en el registro.");
      }

    } catch (err) {
      setMsg("Error al conectar con el servidor.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h2>Crear Cuenta</h2>

      <form onSubmit={handleSubmit}>
        
        <label>Nombre completo</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <label>Correo institucional</label>
        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={handleChange}
          placeholder="nombre.apellido@utec.edu.pe"
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label>Número telefónico</label>
        <input
          type="text"
          name="numero_telefonico"
          value={form.numero_telefonico}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarme"}
        </button>

      </form>

      {msg && <p style={{ marginTop: "10px" }}>{msg}</p>}
    </div>
  );
}
