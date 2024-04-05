import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const FailPayment = () => {
  const { reloadSession } = useContext(AuthContext);

  useEffect(() => {
    reloadSession();
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
      <h1>Payment Failed!</h1>
    </article>
  );
};

export default FailPayment;
