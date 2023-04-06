import React, { useState } from "react";
import "./PaymentForm.css";

const PaymentForm = () => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your code here to submit the form data to your server or payment gateway
    console.log("Form submitted: ", { name, cardNumber, expiryDate, cvv });
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
