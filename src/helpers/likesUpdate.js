import Cookies from "js-cookie";
import client from "../api/axiosClient";

export const likesUpdate = (likes, auth) => {
     const accessToken = Cookies.get("accessToken");
     const refreshToken = Cookies.get("refreshToken");
  if (accessToken) {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const URL = `/api/users/${auth.login.username}/update-likes`;
    client
      .put(URL, JSON.stringify({likes, refreshToken}), options)
      .catch((err) =>
        console.error("Error updatting the user likes form the server", err)
      );
  } else {
    return false;
  }
};
