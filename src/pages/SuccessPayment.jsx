import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const transactionId = hashParams.get("merchant_order_id");
      setTimeout(() => navigate(`/transaction/${transactionId}`), 2000);
    }
    fetchData();
  }, []);

  return (
    <article
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Success Payment!</h1>
    </article>
  );
};

export default SuccessPayment;
