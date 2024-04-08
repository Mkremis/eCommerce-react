import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import CartReview from "../components/CartReview";

import MercadoPago from "../components/MercadoPago";

import LoginForm from "../components/LoginForm";

const Checkout = () => {
  const { auth: user, cart } = useContext(AuthContext);

  return (
    <article className="checkout">
      <h2 style={{ textAlign: "center" }}>Review your cart</h2>
      <div className="cart-review">
        <CartReview />
      </div>
      {user ? (
        cart.length && <MercadoPago cart={cart} />
      ) : (
        <div style={{ marginTop: "3rem" }}>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Please login to your user account to make an order
          </p>
          <LoginForm />
        </div>
      )}
    </article>
  );
};

export default Checkout;
