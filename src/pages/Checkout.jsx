import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import CartReview from "../components/CartReview";


const Checkout = () => {
  const {cart, auth} = useContext(AuthContext);
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
    console.log(data)
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
