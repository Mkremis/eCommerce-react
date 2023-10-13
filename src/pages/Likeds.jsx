import { Link, useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Likeds = () => {
  const likes = useLoaderData();

  return (
    <article
      className="content"
      style={{ backgroundColor: "antiquewhite", marginTop: 0 }}
    >
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
  );
};
export default Likeds;
