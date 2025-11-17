import { useEffect, useState } from "react";
import { getMe } from "../api/users";
import Navbar from "../components/NavBar";
import Button from "../components/Button";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const u = await getMe();
      setUser(u);
    } catch (err) {
      console.error(err);
    }
  }

  if (!user) return <p>Cargando...</p>;

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.left}>
          <img
            src="https://i.pravatar.cc/300"
            alt="Foto de perfil"
            style={styles.avatar}
          />
        </div>

        <div style={styles.right}>
          <div style={styles.card}>
            <h1 style={styles.title}>Mi Perfil</h1>

            <p style={styles.text}><strong>Nombre:</strong> {user.nombre}</p>
            <p style={styles.text}><strong>Correo:</strong> {user.correo}</p>
            <p style={styles.text}><strong>Rol:</strong> {user.rol}</p>
            <p style={styles.text}><strong>Número de telefono:</strong> {user.numero_telefonico}</p>

            <a href="/profile/edit">
              <Button>Editar Perfil</Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(80vh - 100px)",
    gap: "80px",
    backgroundColor: "#0057d9",
    padding: "40px",
  },
  left: {
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    border: "4px solid white",
  },
  right: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "16px",
    width: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "20px",
  },
  text: {
    fontSize: "20px",
    margin: "10px 0",
  }
};
