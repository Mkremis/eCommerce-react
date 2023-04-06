import React from "react";
import ProductDetails from "./ProductDetails";
import ProductGallery from "./ProductGallery";
import ProductGalleryModal from "./ProductGalleryModal";

const ProductView = ({ product }) => {
  return (
    <section className="content-order">
      <ProductGallery product={product} />
      <ProductDetails product={product} />
      {/* <ProductGalleryModal product={product} /> */}
    </section>
  );
};

export default ProductView;
