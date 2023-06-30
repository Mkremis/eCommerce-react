import axios from "axios";
import Cookies from "js-cookie";

const LOGIN_URL = `https://ecommerce-users-api-production.up.railway.app/api/users/login`;
export const handleLogin = async (login_username, login_password) => {
  try {
    const response = await axios.post(LOGIN_URL, {
      login_username,
      login_password,
    });
    console.log(response);
    Cookies.set("accessToken", response.data.token, { sameSite: "strict" });
    const userData = response.data.user;
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
