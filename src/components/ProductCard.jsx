import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ gender, image, name, id, children }) => {
  return (
    <figure id={id}>
      <Link to={`/${gender}/${id}`}>
        <img className="product-image" src={image} alt={name} />
      </Link>
      <figcaption className="product-description" id={id}>
        <Link to={`/${gender}/${id}`}>{name}</Link>

        {children}
      </figcaption>
    </figure>
  );
};

export default ProductCard;
