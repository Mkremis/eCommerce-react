import { useNavigate } from "react-router-dom";

export default function Receipt({ transaction, items }) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };
  return (
    transaction && (
      <div className="container">
        <h2 className="heading">Transaction Details</h2>
        <p className="value">
          <span className="label">Transaction Reference:</span>
          {transaction._id}
        </p>
        <p className="value">
          <span className="label">Transaction Amount:</span>
          {formatCurrency(
            transaction.total_paid_amount,
            transaction.currency_id
          )}
        </p>
        <p className="value">
          <span className="label">Transaction Date:</span>
          {formatDate(transaction.transaction_date)}
        </p>
        <p className="value">
          <span className="label">Transaction Type:</span>
          {transaction.order_type}
        </p>
        <p className="value">
          <span className="label">Card Number:</span>
          **** **** **** {transaction.card_number}
        </p>
        <p className="value">
          <span className="label">Payment Method:</span>
          {transaction.payment_method}
        </p>
        <p
          className={`value ${
            transaction.status_detail === "accredited"
              ? "successMessage"
              : "failMessage"
          }`}
        >
          <span className="label">Transaction Status:</span>
          {transaction.status_detail}
        </p>
        <p className="value">
          <span className="label">Shipping Cost:</span>
          {formatCurrency(transaction.shipping_amount, transaction.currency_id)}
        </p>
        <p className="value">
          <span className="label">Transaction Currency:</span>
          {transaction.currency_id}
        </p>
        <p className="value">
          <span className="label">Total Paid:</span>
          {formatCurrency(
            transaction.total_paid_amount,
            transaction.currency_id
          )}
        </p>
        <div>
          <h3 className="heading">Items Purchased</h3>
          {items.length &&
            items.map((item) => (
              <div
                key={item._id}
                className="itemRow"
                onClick={() => navigate(`/${item.gender}/${item.prodId}`)}
              >
                <img
                  src={item.prodImage}
                  alt={item.prodName}
                  className="thumbnail"
                />
                <span className="itemName">
                  {item.prodName} - Quantity: {item.productQ}
                </span>
              </div>
            ))}
        </div>
      </div>
    )
  );
}
