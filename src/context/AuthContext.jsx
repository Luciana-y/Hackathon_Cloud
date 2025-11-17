// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // objeto decodificado
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Prioriza token separado; también soporta formato antiguo "auth"
    const savedToken = localStorage.getItem("token");
    const savedAuth = localStorage.getItem("auth");

    if (savedToken) {
      try {
        const decoded = jwtDecode(receivedToken);
        // opcional: validar expiración si payload incluye exp
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          // token expirado
          localStorage.removeItem("token");
          localStorage.removeItem("auth");
          setUser(null);
          setToken(null);
          return;
        }

        setUser(decoded);
        setToken(savedToken);
      } catch (e) {
        console.error("Token inválido:", e);
        localStorage.removeItem("token");
        localStorage.removeItem("auth");
      }
    } else if (savedAuth) {
      // compatibilidad con formato que guardaba todo en auth
      try {
        const parsed = JSON.parse(savedAuth);
        if (parsed?.token) {
          const decoded = jwtDecode(receivedToken);
          if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("auth");
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
            return;
          }
          setUser(decoded);
          setToken(parsed.token);
          localStorage.setItem("token", parsed.token);
        }
      } catch (e) {
        console.error(e);
        localStorage.removeItem("auth");
      }
    }
  }, []);

  function login(receivedToken) {
    try {
      const decoded = jwtDecode(receivedToken);
      // guardar token y usuario decodificado
      setUser(decoded);
      setToken(receivedToken);
      localStorage.setItem("token", receivedToken);
      localStorage.setItem("auth", JSON.stringify({ user: decoded, token: receivedToken }));
    } catch (e) {
      console.error("No se pudo decodificar token:", e);
      throw e;
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
  }

  // helper para cabeceras
  function authHeader() {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, authHeader }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
