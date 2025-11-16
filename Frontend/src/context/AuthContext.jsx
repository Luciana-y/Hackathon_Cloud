import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { apiFetch } from "../api/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token");
        logout();
      }
    }
  }, [token]);

  function login(token) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setRole(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
