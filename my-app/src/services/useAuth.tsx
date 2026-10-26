import { useState, useEffect } from "react";


const API_URL = "http://localhost:8080";


export const useAuth = () => {


const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

const checkAuth = () => {
    fetch(`${API_URL}/user/dashboard`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Sesión no válida");
        return res.json(); 
      })
      .then((data) => setUser(data))
      .catch((err) => {
            console.error(err);
            setUser(null);
      })
      .finally(() => setLoading(false));
}

useEffect(() => {
    checkAuth();
  }, []);

const login = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  };

const logout = () => {
    // Naveguem directament a l'endpoint de logout de Spring (com fem amb el login).
    // Així la cookie JSESSIONID s'envia sempre, Spring invalida la sessió,
    // i el logoutSuccessHandler retorna 200 sense redirigir a Google.
    setUser(null);
    window.location.href = `${API_URL}/logout`;
}
return { user, loading, login, logout, checkAuth };
}


