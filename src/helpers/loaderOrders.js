import client from "../api/axiosClient";

export const loaderOrders = async ({ params }) => {
  try {
    const { username } = params;
    const response = await client.get(`/api/users/${username}/orders`);
    return response.data.orders;
  } catch (err) {
    console.error(err);
    return null;
  }
};
