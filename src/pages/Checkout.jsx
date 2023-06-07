import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import CartReview from "../components/CartReview";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
  const {cart, auth} = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePay = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { 
        'Authorization': `Bearer ${auth}`,
        'Content-Type': 'application/json', },
        body: JSON.stringify(cart),
    };
    const response = await fetch(`https://ecommerce-users-api-production.up.railway.app/api/create-order`,requestOptions)
    const data = await response.json();
    if (data.init_point) window.location.href=data.init_point;
  };

  return (
    <article className="checkout">
       <h2 style={{textAlign: 'center'}}>Review your cart</h2>
      <div className="cart-review">
        <CartReview />
      </div>
        <button onClick={handlePay} className="pay-button">Pay</button>
    </article>
  );
};

export default Checkout;
