import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import GenderHeader from '../components/GenderHeader';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { homeData } = useLoaderData();
  let [womenData, menData] = homeData;

  return (
    <>
      <Hero />
      <section className="content">
        <div className="WM-home">
          <GenderHeader gender="women" />
          {womenData &&
            womenData.map((product) => (
              <Link
                to={`/women/${product.id}`}
                key={product.id}
                className="home-product"
              >
                <ProductCard
                  key={product.id}
                  image={`https://${product.imageUrl}`}
                  name={product.name}
                  price_curr={product.price.current.text}
                  id={product.id}
                />
              </Link>
            ))}
        </div>
        <div className="M-home">
          <GenderHeader gender="men" classN="M-product-header" />
          {menData &&
            menData.map((product) => (
              <Link
                to={`/men/${product.id}`}
                key={product.id}
                className="home-product"
              >
                <ProductCard
                  image={`https://${product.imageUrl}`}
                  name={product.name}
                  price_curr={product.price.current.text}
                  id={product.id}
                />
              </Link>
            ))}
        </div>
      </section>
    </>
  );
};
export default Home;
