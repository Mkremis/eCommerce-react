import axios from "axios";
import Cookies from "js-cookie";

export const loaderOrders = async ({ params }) => {
  try {
    const { username } = params;
    const accessToken = Cookies.get("accessToken");
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const ORDERS_URL = `https://ecommerce-users-api-production.up.railway.app/api/users/${username}/orders`;
    const response = await axios(ORDERS_URL, options);
    if (response.status !== 200) throw new Error(responseOrders.message);
    return response.data.orders;
  } catch (error) {
    alert(error);
    console.error(error);
    return null;
  }
};
