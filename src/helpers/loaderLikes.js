import Cookies from "js-cookie";
export const loaderLikes = async ({ params }) => {
  const token = Cookies.get("accessToken");
  try {
    const { username } = params;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/${username}/likes`;
    const response = await window.fetch(endpoint, options);
    const responseLikes = await response.json();
    if (response.status !== 200) throw new Error(responseOrders.message);
    return responseLikes.user_likes;
  } catch (error) {
    alert(error);
    console.error(error);
    return null;
  }
};
