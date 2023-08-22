import client from "./axiosClient";

export const login = async (login_username, login_password) =>
  client.post(`/api/users/login`, {
    login_username,
    login_password,
  });
export const register = async (userData) =>
  client.post("/api/users/register", JSON.stringify(userData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
export const updateUser = async (userData) =>
  client.put("/api/users/update", JSON.stringify(userData), {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getDashboard = async () => client.get(`/api/users/dashboard`);
