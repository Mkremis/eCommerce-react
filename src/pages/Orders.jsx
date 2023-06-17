import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Orders = () => {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const orders = useLoaderData();
  if (!orders) return handleLogout();

  return (
    <article style={{ backgroundColor: "antiquewhite" }}>
      <table cellSpacing={0} className="orders-table">
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
