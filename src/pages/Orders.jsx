import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const orders = useLoaderData();
  return (
    <article>
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>Order History</h1>
      <table border={1} cellSpacing={0} className="orders-table">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Date</th>
            <th>Transaction Id</th>
            <th>Payment Method</th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Gender</th>
            <th>Product Price</th>
            <th>Quantity</th>
            <th>Total Order</th>
          </tr>
        </thead>
        <tbody className="orders-table__body">
          {orders.length < 1 ? (
            <tr>
              <td colSpan={10}>No orders yet</td>
            </tr>
          ) : (
            orders.map((order) => {
              return (
                <tr
                  key={order.id}
                  className="orders-table__order"
                  onClick={() => navigate(`/${order.gender}/${order.prodId}`)}
                >
                  <td>
                    <img src={order.prodImage} />
                  </td>
                  <td>{new Date(order.transactionDate).toLocaleString()}</td>
                  <td>{order.id}</td>
                  <td>{order.transactionType}</td>
                  <td>{order.prodId}</td>
                  <td>{order.prodName}</td>
                  <td>{order.gender}</td>
                  <td>$ {order.prodPrice}</td>
                  <td>{order.productQ}</td>
                  <td>$ {parseFloat(order.prodPrice) * order.productQ}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </article>
  );
};
export default Orders;
