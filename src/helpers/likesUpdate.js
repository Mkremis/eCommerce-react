import axios from "axios";
import Cookies from "js-cookie";

export const likesUpdate = (likes, auth) => {
     const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const LIKES_UPDATE_URL = `https://ecommerce-users-api-production.up.railway.app/api/users/${auth.login.username}/update-likes`;
    axios
      .put(LIKES_UPDATE_URL, JSON.stringify(likes), options)
      .catch((err) =>
        console.error("Error updatting the user likes form the server", err)
      );
  } else {
    return false;
  }
};
