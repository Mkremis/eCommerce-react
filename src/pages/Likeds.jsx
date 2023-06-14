import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ProductCard from "../components/ProductCard";

const Likeds = () => {
  const { likes } = useContext(AuthContext);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>❤❤ You Like It! ❤❤</h1>
      <article className="content">
        {likes.length > 0 &&
          likes.map((product) => {
            return (
              <section className="product" key={product.id}>
                <Link to={`/${product.gender}/${product.id}`}>
                  <ProductCard
                    image={product.image}
                    name={product.name}
                    price_curr={product.price}
                    id={product.id}
                  />
                </Link>
              </section>
            );
          })}
      </article>
    </>
  );
};
export default Likeds;
