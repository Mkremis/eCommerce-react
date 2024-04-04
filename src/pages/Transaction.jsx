import { useLoaderData } from "react-router-dom";
import Recipt from "../components/recipt";
import { useEffect, useState } from "react";

const Transaction = () => {
  const [transaction, setTransaction] = useState(null);
  const [items, setItems] = useState(null);
  //const { transaction, items } = useLoaderData();

  useEffect(() => {
    async function fetchData() {
      const params = new URLSearchParams(window.location.search);
      const transactionId = params.get("merchant_order_id");
      if (transactionId) {
        const response = await ordersRequests().getTransactions(transactionId);
        setTransaction(response?.data?.transaction);
        setItems(response?.data?.items);
      }
    }
    fetchData();
  }, []);

  return (
    <article style={{ marginTop: "3rem" }}>
      {transaction && items && (
        <Recipt transaction={transaction} items={items} />
      )}
    </article>
  );
};

export default Transaction;
