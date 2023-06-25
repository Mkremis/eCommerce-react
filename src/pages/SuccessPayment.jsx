import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
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
      <h1>Success Payment!</h1>
    </article>
  );
};

export default SuccessPayment;
