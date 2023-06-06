import React, { useContext, useState } from "react";
import "./PaymentForm.css";
import AuthContext from "../context/AuthContext";




const PaymentForm = () => {
  const {cart, auth} = useContext(AuthContext);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = async (event) => {
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
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-group">
        <label htmlFor="name">Name on Card:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(event) => setCardNumber(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="expiryDate">Expiry Date:</label>
        <input
          type="text"
          id="expiryDate"
          value={expiryDate}
          onChange={(event) => setExpiryDate(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          value={cvv}
          onChange={(event) => setCvv(event.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default PaymentForm;
