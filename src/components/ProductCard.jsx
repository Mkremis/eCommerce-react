import React from "react";
import "./ProductCard.css";

const ProductCard = ({ image, name, price_curr, id }) => {
  return (
    <figure id={id}>
      <img className="product-image" src={image} alt={name} />
      <figcaption className="product-description" id={id}>
        <span className="product-name">{name}</span>
        <span className="product-price">{price_curr}</span>
      </figcaption>
    </figure>
  );
};

export default ProductCard;
