import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, updateMe } from "../api/users";
import Navbar from "../components/NavBar";

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    numero_telefonico: "",
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const u = await getMe();
    setForm({
      nombre: u.nombre,
      numero_telefonico: u.numero_telefonico,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateMe(form);
      alert("Perfil actualizado");
      navigate("/profile");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Editar Perfil</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Nombre completo</label>
            <input
              style={styles.input}
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
            />

            <label style={styles.label}>Número telefónico</label>
            <input
              style={styles.input}
              value={form.numero_telefonico}
              onChange={(e) =>
                setForm({ ...form, numero_telefonico: e.target.value })
              }
              required
            />

            <button style={styles.button}>Guardar Cambios</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#e8effb",
    minHeight: "100vh",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: 60,
    padding: "0 20px",
  },
  card: {
    backgroundColor: "white",
    padding: "40px 50px",
    width: "420px",
    borderRadius: "14px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
  },
  title: {
    textAlign: "center",
    fontSize: "26px",
    marginBottom: "25px",
    color: "#153b78",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  label: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#2d2d2d",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "#153b78",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
  },
};
