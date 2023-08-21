import React, { useContext } from "react";
import client from "../api/axiosClient";
import AuthContext from "../context/AuthContext";
import CartReview from "../components/CartReview";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePay = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await client.post(
      `/api/create-order`,
      JSON.stringify({ cart }),
      options
    );
    const { data } = response;
    if (data.init_point) window.location.href = data.init_point;
  };

  return (
    <article className="checkout">
      <h2 style={{ textAlign: "center" }}>Review your cart</h2>
      <div className="cart-review">
        <CartReview />
      </div>
      <button onClick={handlePay} className="pay-button">
        Pay
      </button>
    </article>
  );
};

export default Checkout;
