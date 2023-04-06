import React from "react";
import CartReview from "../components/CartReview";
import PaymentForm from "../components/PaymentForm";

const Checkout = () => {
  return (
    <article className="checkout">
      <div className="payment">
        <PaymentForm />
      </div>

      <div className="cart-review">
        <h2>Review your cart:</h2>
        <CartReview />
      </div>
    </article>
  );
};

export default Checkout;
