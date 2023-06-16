export const loaderOrders = async ({ params }) => {
  try {
    const { username } = params;
    const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/orders/${username}`;
    const response = await window.fetch(endpoint);
    const responseOrders = await response.json();
    if (response.status !== 200) throw new Error(responseOrders.message);
    return responseOrders.orders;
  } catch (error) {
    alert(error);
    console.error(error);
    return null;
  }
};
