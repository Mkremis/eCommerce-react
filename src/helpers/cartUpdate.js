import axios from "axios";
import Cookies from "js-cookie";

export const cartUpdate = (cart, auth) => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const CART_UPDATE_URL = `https://ecommerce-users-api-production.up.railway.app/api/users/${auth.login.username}/update-cart`;
    axios
      .put(CART_UPDATE_URL, JSON.stringify(cart), options)
      .catch((err) =>
        console.error("Error updatting the user cart form the server", err)
      ); 
  } else {
    return false;
  }
  // localStorage.setItem("cart", JSON.stringify(cart));
};
