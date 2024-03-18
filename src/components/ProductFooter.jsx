import React from "react";
import Like from "./Like";

const ProductFooter = ({
  prodId,
  prodName,
  prodGender,
  prodImage,
  prodPrice,
}) => {
  return (
    <div className="product-description__footer">
      <span className="product-price">{prodPrice.current.text}</span>
      <Like
        prodId={prodId}
        prodName={prodName}
        prodGender={prodGender}
        prodImage={prodImage}
        prodPrice={prodPrice.current.value}
        priceCurrency={prodPrice.currency}
        styles={{
          fontSize: "1rem",
        }}
      />
    </div>
  );
};

export default ProductFooter;
