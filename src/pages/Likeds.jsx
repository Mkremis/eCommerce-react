import { useLoaderData } from "react-router-dom";
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
          const price = {
            currency: product.priceCurrency,
            current: {
              value: product.prodPrice,
              text: `$${product.prodPrice}`,
            },
          };
          return (
            <section className="product" key={product.id}>
              <ProductCard
                image={product.prodImage}
                name={product?.prodName}
                id={product?.prodId}
                gender={product?.ProdGender}
                price={price}
              />
            </section>
          );
        })}
    </article>
  );
};
export default Likeds;
