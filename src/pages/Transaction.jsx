import Receipt from "../components/Receipt";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ordersRequests } from "../api/clientRequests";

const Transaction = () => {
  const [transaction, setTransaction] = useState(null);
  const [items, setItems] = useState(null);
  const { merchant_order_id } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (merchant_order_id) {
        const response = await ordersRequests().getTransactions(
          merchant_order_id
        );
        setTransaction(response?.data?.transaction);
        setItems(response?.data?.items);
      }
    }
    fetchData();
  }, [merchant_order_id]);

  return (
    <article style={{ marginTop: "3rem" }}>
      {transaction && items && (
        <Receipt transaction={transaction} items={items} />
      )}
    </article>
  );
};

export default Transaction;
