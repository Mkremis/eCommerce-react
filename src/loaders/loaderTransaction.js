import { ordersRequests } from "../api/clientRequests";

const loaderTransaction = async ({ params }) => {
  try {
    const response = await ordersRequests().getTransactions(
      params.transactionId
    );
    const { transaction, items } = response?.data;
    return transaction ? { transaction, items } : null;
  } catch (error) {
    console.log(error);
  }
};
export default loaderTransaction;
