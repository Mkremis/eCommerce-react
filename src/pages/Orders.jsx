import React from "react";
import { useLoaderData } from "react-router-dom";

const Orders = () => {
  const orders = useLoaderData();
  console.log(orders);
  return <h1 style={{ textAlign: "center" }}>Order History</h1>;
};
export default Orders;
