import { useState, useEffect } from "react";


const API_URL = "http://localhost:8080";


export const Auth = () => {


const [user, setUser] = useState(null);

const login = () => {
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
            window.location.href = `${API_URL}/oauth2/authorization/google`;
      });
}

const logout = () => {
    fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setUser(null); // Al poner user en null, el Header cambiará automáticamente a "Login"
          window.location.href = "/";
        }
      })
      .catch((err) => console.error(err));
}
return {user, login, logout};
}


