import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import CartReview from "../components/CartReview";
import { useNavigate } from "react-router-dom";
import { orderRequests } from "../api/clientRequests";

const Checkout = () => {
  const { cart } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePay = async () => {
    console.log(cart);
    try {
      const response = await orderRequests().createOrder(cart);
      if (response.data.payLink) window.location.href = response.data.payLink;
    } catch (error) {
      console.log(error);
    }
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
