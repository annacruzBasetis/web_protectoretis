import { useEffect, useState } from "react";
import Header from "../components/Header";

const DashPage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:8080/user/dashboard", {
      method: "GET",
      credentials: "include", // IMPORTANTE: Envía la cookie JSESSIONID de la sesión
    })
      .then((res) => {
        // Si el backend devuelve un 401/403, lanzamos error para ir al .catch()
        if (!res.ok) throw new Error("Sesión no válida");
        return res.json(); // 2. Convertimos la respuesta HTTP a JSON
      })
      .then((data) => setUser(data))
      .catch((err) => {
            console.error(err);
            window.location.href = "http://localhost:8080/oauth2/authorization/google";
      });
  }, []);

  if (!user) return <p>Cargando perfil...</p>;

  const handleLogout = () => {
    fetch("http://localhost:8080/logout", {
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
  };

  return (
    <div>
      <Header user={user} onLogout={handleLogout}/>
      <h1>Bienvenido, {user.name}</h1>
      <p>Email: {user.email}</p>
      {user.picture && <img src={user.picture} alt="Avatar" width={80} />}
    </div>
  );
};

export default DashPage;