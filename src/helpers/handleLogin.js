import axios from "axios";
import Cookies from "js-cookie";

const LOGIN_URL = `https://ecommerce-users-api-production.up.railway.app/api/users/login`;
export const handleLogin = async (login_username, login_password) => {
  const options = {
    method: "POST",
    body: JSON.stringify({
      login_username,
      login_password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(LOGIN_URL, options);
    const responseLogin = await response.json();
    const userData = responseLogin?.user;
    let data = {};
    for (const key in userData) {
      if (key !== "user_cart") {
        let keys = key.split("_");
        let val = { [keys[1]]: userData[key] };
        data[keys[0]] = { ...data[keys[0]], ...val };
      }
    }

    const userCart = userData.user_cart;
    const userLikes = userData.user_likes;

    return { data, userCart, userLikes };
  } catch (err) {
    console.error(err);
  }
};
