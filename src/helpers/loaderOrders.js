export const loaderOrders = async ({ params }) => {
  const { username } = params;
  const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/orders/${username}`;
  const response = await window.fetch(endpoint);
  const orders = await response.json();
  return orders;
};
