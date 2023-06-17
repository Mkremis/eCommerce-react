import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import GenderHeader from "../components/GenderHeader";
import ProductCard from "../components/ProductCard";
import ProductFooter from "../components/ProductFooter";

const HomeContent = () => {
  const { homeData } = useLoaderData();
  let [womenData, menData] = homeData;

  return (
      <section className="home-content">
        <div className="WM-home">
          <GenderHeader gender="women" />
          {womenData &&
            womenData.map((product) => {
              if (product.productType === "Product") {
                return (
                  <section className="home-product" key={product.id}>
                    <Link to={`/women/${product.id}`}>
                      <ProductCard
                        key={product.id}
                        image={`https://${product.imageUrl}`}
                        name={product.name}
                        id={product.id}
                      />
                    </Link>
                    <ProductFooter
                      price={product.price.current.text}
                      id={product.id}
                      name={product.name}
                      image={`https://${product.imageUrl}`}
                      gender={"women"}
                    />
                  </section>
                );
              }
            })}
        </div>
        <div className="M-home">
          <GenderHeader gender="men" classN="M-product-header" />
          {menData &&
            menData.map((product) => {
              if (product.productType === "Product") {
                return (
                  <section className="home-product" key={product.id}>
                    <Link to={`/men/${product.id}`}>
                      <ProductCard
                        image={`https://${product.imageUrl}`}
                        name={product.name}
                        id={product.id}
                      />
                    </Link>
                    <ProductFooter
                      price={product.price.current.text}
                      id={product.id}
                      name={product.name}
                      image={`https://${product.imageUrl}`}
                      gender={"men"}
                    />
                  </section>
                );
              }
            })}
        </div>
      </section>

  );
};
export default HomeContent;
