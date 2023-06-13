export const loaderOrders = async ({ params }) => {
  try {
    const { username } = params;
    const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/orders/${username}`;
    const response = await window.fetch(endpoint);
    const { orders } = await response.json();
    if (response.status === 200) return orders;
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
