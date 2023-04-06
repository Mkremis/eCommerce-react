import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductView from "../components/ProductView";

const ReviewProduct = () => {
  const { res } = useLoaderData();

  return <ProductView product={res} />;
};

export default ReviewProduct;
