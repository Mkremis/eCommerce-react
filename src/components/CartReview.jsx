import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const CartReview = () => {
  const { cart, setCart} = useContext(AuthContext);
  const navigate = useNavigate();
  
  let cartItems = 0;
  const handleRemoveItem = ({ target }) => {
    const item = target.id;
    setCart({...cart, ...cart[item].productQ = 0})
}

  const reviewItems = () => {
    let totalCart = 0;
    let toRender = [];
    // if some product quantity in the cart is = 0, this product is deleted from the cart modal (not from the user or session object CART)
    for (const item in cart) {
      if (cart[item]['productQ'] > 0) {
        cartItems++;
        let totalPrice = cart[item].prodPrice * cart[item].productQ;
        totalCart += totalPrice;
        toRender.push(
          <article className="cart-modal__item" key={item}>
            <div
              className="cart-modal__item-details"
              id={item}
              onClick={() => navigate(`/${cart[item].gender}/${item}`)}
            >
              <img
                className="cart-modal__image"
                src={`https://${cart[item].prodImage}`}
                alt={`${cart[item].prodName}`}
              />
              <p className="cart-modal__product">{cart[item].prodName}</p>
              <p className="cart-modal__quantity">x {cart[item].productQ}</p>
              <p className="cart-modal__total-price">${totalPrice}</p>
            </div>
            <div className="cart-modal__delete-container">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '1rem' }}
                id={item}
                onClick={handleRemoveItem}
              >
                delete
              </span>
            </div>
          </article>
        );
      }
    }
    return { toRender, totalCart };
  };

  return (
    <>
      <div className="cart-modal__header">
        <h3 className="cart-modal__title">Cart</h3>
        <p className="cart-modal__total-cart">
          Total: $<span>{reviewItems().totalCart}</span>
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
