import type { DirectionsTransitFilledOutlined } from "@mui/icons-material";

const API_URL = "http://localhost:8080";

interface User {
  name: string;
  email: string;
}

export const userService = () => {

  const getAll = async () => {
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  }

  const create = async (data: User) => {
      const response = await fetch(`${API_URL}/user`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  }
  
  const deleteUser = async (id: number) => {
    const response = await fetch(`${API_URL}/user/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText || "No se pudo eliminar el usuario"}`);
  }
  }

  return { getAll, create, deleteUser }
};
