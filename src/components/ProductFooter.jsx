import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

const ProductFooter = ({ price, id, name, image }) => {
  const { likes, setLikes } = useContext(AuthContext);
  const initalLike = likes.find((obj) => obj.id === id) || null;
  const [like, setLike] = useState(initalLike);
  const product = { id, name, image, price };
  const handleLike = () => {
    if (like) {
      setLike(false);
      let newLikes = likes.filter(({ id }) => id !== product.id);
      setLikes(newLikes);
    } else {
      setLike(true);
      setLikes([...likes, product]);
    }
  };

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
