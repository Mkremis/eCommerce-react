import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { cartRequests } from "../api/clientRequests";
import { useGetCart } from "../hooks/useGetCart";

const CartReview = () => {
  const { cart, setCart, auth: user } = useContext(AuthContext);
  const navigate = useNavigate();

  let cartItems = 0;
  const handleRemoveItem = async ({ target }) => {
    const item = target.id;
    try {
      await cartRequests().deleteCartItem(item);
      useGetCart(user, setCart);
    } catch (error) {
      console.error(
        "Error updatting the user cart form the server:",
        error.message
      );
    }
  };
  const reviewItems = () => {
    let totalCart = 0;
    let toRender = [];

    for (const item in cart) {
      cartItems++;
      let totalPrice = cart[item].prodPrice * cart[item].productQ;
      totalCart += totalPrice;
      toRender.push(
        <article className="cart-modal__item" key={item}>
          <div
            className="cart-modal__item-details"
            id={cart[item].prodId}
            onClick={() =>
              navigate(`/${cart[item].gender}/${cart[item].prodId}`)
            }
          >
            <img
              className="cart-modal__image"
              src={`https://${cart[item].prodImage}`}
              alt={`${cart[item].prodName}`}
            />
            <p className="cart-modal__product">{cart[item].prodName}</p>
            <p className="cart-modal__quantity">x {cart[item].productQ}</p>
            <p className="cart-modal__total-price">${totalPrice.toFixed(2)}</p>
          </div>
          <div className="cart-modal__delete-container">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "1rem" }}
              id={cart[item].id}
              onClick={handleRemoveItem}
            >
              delete
            </span>
          </div>
        </article>
      );
    }
    return { toRender, totalCart };
  };

  return (
    <>
      <div className="cart-modal__header">
        <h3 className="cart-modal__title">Cart</h3>
        <p className="cart-modal__total-cart">
          Total: $<span>{reviewItems().totalCart.toFixed(2)}</span>
        </p>
      </div>
      <div className="cart-modal__checkout-container">
        {cartItems > 0 ? (
          <div className="cart-modal__details-container">
            {reviewItems().toRender}
          </div>
        ) : (
          <div className="cart-modal__empty ">
            <p>Your cart is empty</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartReview;
