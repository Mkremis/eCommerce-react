import axios from "axios";
import Cookies from "js-cookie";

export const loaderLikes = async ({ params }) => {
  const accessToken = Cookies.get("accessToken");
  try {
    const { username } = params;
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const LIKES_URL = `https://ecommerce-users-api-production.up.railway.app/api/users/${username}/likes`;
    const response = await axios(LIKES_URL, options);
    console.log(response);
    if (response.status !== 200) throw new Error(responseOrders.message);
    return response.data.user_likes;
  } catch (error) {
    alert(error);
    console.error(error);
    return null;
  }
};
