import React from "react";
import { useNavigate } from "react-router-dom";

import "./CartModal.css";
import CartReview from "./CartReview";

const CartModal = ({ handleOpenCart, cartItems }) => {
  const navigate = useNavigate();

  return (
    <article className="cart-modal">
      <span
        className="cart-modal__close"
        onClick={handleOpenCart}
        title="Close Modal">
        &times;
      </span>
      <section className="cart-modal__content">
        <CartReview />
        {cartItems > 0 && (
          <div className="cart-modal__checkout">
            <button
              onClick={() => {
                navigate("/checkout");
                handleOpenCart();
              }}>
              Checkout
            </button>
          </div>
        )}
      </section>
    </article>
  );
};

export default CartModal;
