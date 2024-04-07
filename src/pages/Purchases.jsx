import { useContext } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Purchases = () => {
  const navigate = useNavigate();
  const purchases = useLoaderData();
  const { currency } = useContext(AuthContext);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };
  return (
    <article>
      <table cellSpacing={0} className="purchases-table">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Gender</th>
            <th>Product Price</th>
            <th>Quantity</th>
            <th>Total Order</th>
            <th>Transaction Id</th>
          </tr>
        </thead>
        <tbody className="purchases-table__body">
          {purchases.length < 1 ? (
            <tr>
              <td colSpan={10}>No purchases yet</td>
            </tr>
          ) : (
            purchases.map((item) => {
              return (
                <tr
                  key={item._id || item.id}
                  className="purchases-table__order"
                >
                  <td
                    onClick={() => navigate(`/${item.gender}/${item.prodId}`)}
                  >
                    <img src={item.prodImage} />
                  </td>
                  <td>{item.prodId}</td>
                  <td>{item.prodName}</td>
                  <td>{item.prodGender}</td>
                  <td>{formatCurrency(item.prodPrice)}</td>
                  <td>{item.productQ}</td>
                  <td>
                    {formatCurrency(parseFloat(item.prodPrice * item.productQ))}
                  </td>

                  <td>
                    <Link to={`/transaction/${item.order_id}`}>
                      {item.order_id}
                    </Link>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </article>
  );
};
export default Purchases;
