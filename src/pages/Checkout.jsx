import React, { useContext } from "react";
import Cookies from "js-cookie";
import client from "../api/axiosClient";
import AuthContext from "../context/AuthContext";
import CartReview from "../components/CartReview";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePay = async (event) => {
    event.preventDefault();
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const URL = `/api/create-order`
    const response = await client.post(URL,JSON.stringify({cart, refreshToken}), options);
    const {data} =  response;
    if (data.init_point) window.location.href = data.init_point;
  };

  return (
    <article className="checkout">
      <h2 style={{ textAlign: "center" }}>Review your cart</h2>
      <div className="cart-review">
        <CartReview />
      </div>
      <button onClick={handlePay} className="pay-button">
        Pay
      </button>
    </article>
  );
};

export default Checkout;
