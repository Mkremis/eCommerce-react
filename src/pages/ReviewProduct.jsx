import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductGallery from "../components/ProductGallery";
import ProductDetails from "../components/ProductDetails";

const ReviewProduct = () => {
  const data = useLoaderData();

  return (
    <section className="content-order">
      <ProductGallery product={data} />
      <ProductDetails product={data} />
      {/* <ProductGalleryModal product={data} /> */}
    </section>
  );
};

export default ReviewProduct;
