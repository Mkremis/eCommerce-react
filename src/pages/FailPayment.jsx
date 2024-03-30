import React from "react";
import { useNavigate } from "react-router-dom";

const FailPayment = () => {
  const navigate = useNavigate();
  setTimeout(() => navigate("/"), 2000);

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
      <h1>Payment Failed!</h1>
    </article>
  );
};

export default FailPayment;
