import React from "react";
import "./ProductCard.css";

const ProductCard = ({ image, name, price_curr, id }) => {
  return (
    <figure id={id}>
      <img className="product-image" src={image} alt={name} />
      <figcaption className="product-description" id={id}>
        <p className="product-name">{name}</p>
        <p className="product-price">{price_curr}</p>
      </figcaption>
    </figure>
  );
};

export default ProductCard;
