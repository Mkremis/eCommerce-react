import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductView from "../components/ProductView";

const ReviewProduct = () => {
  const data = useLoaderData();
  return <ProductView product={data} />;
};

export default ReviewProduct;
