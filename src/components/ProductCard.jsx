import React, { useContext } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProductCard = ({ gender, image, name, id, price, children }) => {
  const { setCurrentProduct } = useContext(AuthContext);

  const handleClick = (currentProduct) => {
    setCurrentProduct(currentProduct);
  };

  return (
    <figure id={id}>
      <Link
        to={`/${gender}/${id}`}
        onClick={() => handleClick({ productId: id, productPrice: price })}
      >
        <img className="product-image" src={image} alt={name} />
      </Link>
      <figcaption className="product-description" id={id}>
        <Link
          to={`/${gender}/${id}`}
          onClick={() => handleClick({ productId: id, productPrice: price })}
        >
          {name}
        </Link>

        {children}
      </figcaption>
    </figure>
  );
};

export default ProductCard;
