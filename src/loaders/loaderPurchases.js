import { ordersRequests } from "../api/clientRequests";

const loaderPurchases = async () => {
  try {
    const response = await ordersRequests().getPurchases();
    return response.data.purchases;
  } catch (err) {
    console.error(err);
    return null;
  }
};
export default loaderPurchases;
