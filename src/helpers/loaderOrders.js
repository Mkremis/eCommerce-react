import Cookies from "js-cookie";
export const loaderOrders = async ({ params }) => {
  try {
    const { username } = params;
    const token = Cookies.get("accessToken");
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/${username}/orders`;
    const response = await window.fetch(endpoint, options);
    const responseOrders = await response.json();
    if (response.status !== 200) throw new Error(responseOrders.message);
    return responseOrders.orders;
  } catch (error) {
    alert(error);
    console.error(error);
    return null;
  }
};
