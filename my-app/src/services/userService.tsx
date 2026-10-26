const API_URL = "http://localhost:8080";

interface User {
//  id: number;
  name: string;
  email: string;
//  createdAt: string;
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
  

  return { getAll, create }
};
