const API_URL = "http://localhost:8080";

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

  return { getAll }
};
