import client from "./axiosClient";
import axios from "axios";
import { ASOS_HEADERS } from "../api/apiConfig";

export const updateUser = async (userData) =>
  client.patch("/api/users/update", JSON.stringify(userData), {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const reloadSession = async () => client.get(`/api/users/reload`);

export const serverLogout = async () => {
  try {
    const response = await client.get(`/api/users/logout`);
    if ((response.status = "200")) alert(response.data.message);
  } catch (err) {
    console.error(err);
  }
};

export function productRequests() {
  const getProductDetail = async (prodId) => {
    const options = {
      method: "GET",
      url: "https://asos2.p.rapidapi.com/products/v4/detail",
      params: {
        id: prodId,
        lang: "en-US",
        store: "US",
        sizeSchema: "US",
        currency: "USD",
      },
      headers: ASOS_HEADERS.headers,
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  };
  return { getProductDetail };
}

export function cartRequests() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getUserCart = async () => await client.get(`/api/users/cart`);

  const deleteCartItem = async (itemId) =>
    await client.delete(`/api/users/cart/${itemId}`);

  const updateUserCart = async (updatedCart) =>
    await client.put(`/api/users/cart`, updatedCart, options);

  return { getUserCart, deleteCartItem, updateUserCart };
}

export function likeRequests() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getUserLikes = async () => await client.get(`/api/users/likes`);

  const deleteLike = async (prodId) =>
    await client.delete(`/api/users/likes/${prodId}`);

  const createLike = async (newLike) => {
    return await client.post(`/api/users/likes`, newLike, options);
  };

  return { getUserLikes, deleteLike, createLike };
}

export function userRequests() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const registerUser = async (
    userName,
    email,
    password,
    roles = ["ROLE_USER"]
  ) =>
    client.post(
      "/auth/register",
      { userName, email, password, roles },
      options
    );

  const loginUser = async (userName, password) =>
    client.post(`/auth/login`, {
      userName,
      password,
    });

  const getDashboard = async () => client.get("/api/users/dashboard");

  const updateDashboard = async (newDashboard) =>
    client.put("/api/users/dashboard", newDashboard, options);

  return { registerUser, loginUser, getDashboard, updateDashboard };
}
