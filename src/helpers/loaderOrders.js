import Cookies from "js-cookie";
import client from "../api/axiosClient";

export const loaderOrders = async ({ params }) => {
  try {
    const { username } = params;
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const URL = `/api/users/${username}/orders`;
    const response = await client.post(URL, JSON.stringify({refreshToken}), options);
    return response.data.orders;
  } catch (err) {
    console.error(err);
    return null;
  }
};
