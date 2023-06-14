import React, { useState } from "react";

const ProductFooter = ({ price, id, name, image }) => {
  const [like, setLike] = useState(false);
  const product = { id, name, image, price };
  const handleLike = () => (like ? setLike(null) : setLike(product));

  return (
    <div className="product-description__footer">
      <span className="product-price">{price}</span>
      <button className="product-description__like" onClick={handleLike}>
        {like ? "❤" : "🤍"}
      </button>
    </div>
  );
};

export default ProductFooter;
