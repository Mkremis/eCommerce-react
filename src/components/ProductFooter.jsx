import React from "react";
import Like from "./Like";

const ProductFooter = ({ price, id, name, image }) => {
  return (
    <div className="product-description__footer">
      <span className="product-price">{price}</span>
      <Like id={id} name={name} image={image} price={price} />
    </div>
  );
};

export default ProductFooter;
