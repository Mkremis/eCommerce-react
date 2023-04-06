import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import CartModal from './CartModal';

const CartNotification = () => {
  const { cart, setCart } = useContext(AuthContext);
  const [shake, setShake] = useState(null);
  const [cartItems, setCartItems] = useState(0);
  const [isOpen, setIsOpen] = useState(null);

  const handleOpenCart = () => {
    isOpen ? setIsOpen(null) : setIsOpen(true);
  };
  useEffect(() => {
    if (cart) {
      setShake(true);
      let count = 0;
      for (const item in cart) {
        if (cart[item].productQ > 0) count++;
      }
      setCartItems(count);
    }
    setTimeout(() => {
      setShake(null);
    }, 1000);
  }, [cart]);

  return (
    <>
      <div className="header__cart">
        {cartItems > 0 && (
          <div className="header__cart--notification">
            <span onClick={handleOpenCart}>{cartItems}</span>
          </div>
        )}
        <span
          className="material-symbols-outlined"
          style={shake && { animation: 'shake 0.5s' }}
          onClick={handleOpenCart}
        >
          shopping_cart
        </span>
      </div>
      {isOpen && (
        <CartModal
          handleOpenCart={handleOpenCart}
          cart={cart}
          cartItems={cartItems}
          setCart={setCart}
        />
      )}
    </>
  );
};

export default CartNotification;
