import Receipt from "../components/Receipt";
import { useEffect, useState } from "react";

const Transaction = () => {
  const [transaction, setTransaction] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const params = new URLSearchParams(window.location.search);
      console.log(params);
      const transactionId = params.get("merchant_order_id");
      console.log(transactionId);
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
        <Receipt transaction={transaction} items={items} />
      )}
    </article>
  );
};

export default Transaction;
