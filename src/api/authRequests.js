import client from "./axiosClient";

export const login = async (username, password) =>
  client.post(`/api/users/login`, {
    username,
    password,
  });
export const registerUser = async (userData) =>
  client.post("/api/users/register", JSON.stringify(userData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
export const updateUser = async (userData) =>
  client.patch("/api/users/update", JSON.stringify(userData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
