import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const LOGIN_URL = `https://ecommerce-users-api-production.up.railway.app/api/users/login`;
// const options = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ login_username, login_password }),
//     };
export const handleLogin = async (
  login_username,
  login_password,
  handleLogout
) => {
  try {
    const response = await axios.post(LOGIN_URL, {
      login_username,
      login_password,
    });
    const userData = response?.data?.user;
    let data = {};
    for (const key in userData) {
      if (key !== "user_cart") {
        let keys = key.split("_");
        let val = { [keys[1]]: userData[key] };
        data[keys[0]] = { ...data[keys[0]], ...val };
      }
    }
    const token = response.data.token;
    const userCart = userData.user_cart;
    const userLikes = userData.user_likes;
    // Guardar el token de acceso en una cookie HTTP
    Cookies.set("accessToken", token, { sameSite: "strict" });

    return { token, data, userCart, userLikes };
  } catch (err) {}
};

// .then((response) => {
