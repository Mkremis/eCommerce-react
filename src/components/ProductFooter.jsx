import React from "react";
import Like from "./Like";

const ProductFooter = ({ price, id, name, image, gender }) => {
  return (
    <div className="product-description__footer">
      <span className="product-price">{price}</span>
      <Like
        id={id}
        name={name}
        image={image}
        price={price}
        gender={gender}
        styles={{
          fontSize: "1rem",
        }}
      />
    </div>
  );
};

export default ProductFooter;
