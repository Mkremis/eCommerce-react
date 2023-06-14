import React from "react";
import "./ProductCard.css";

const ProductCard = ({ image, name, id }) => {
  return (
    <figure id={id}>
      <img className="product-image" src={image} alt={name} />
      <figcaption className="product-description" id={id}>
        <span className="product-name">{name}</span>
      </figcaption>
    </figure>
  );
};

export default ProductCard;
