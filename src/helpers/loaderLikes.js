import Cookies from "js-cookie";
import client from "../api/axiosClient";

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
    const URL = `/api/users/${username}/likes`;
    const response = await client(URL, options);
    return response.data.user_likes;
  } catch (err) {
    console.error(err);
    return [];
  }
};
