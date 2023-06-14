import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Like from "./Like";
import "./ProductDetails.css";

const ProductDetails = ({ product }) => {
  const { pathname } = useLocation();
  const gender = pathname.split("/")[1];
  const { handlePlusQ, handleMinusQ, productQ, setProductQ, cart, setCart } =
    useContext(AuthContext);
  const handleCart = () => {
    const updatedCart = {
      ...cart,
      [product.id]: {
        gender,
        prodName: product.name,
        prodImage: product.media.images[0].url,
        prodPrice: product.price.current.value,
        productQ,
      },
    };
    setCart(updatedCart);
  };

  useEffect(() => {
    setProductQ(0);
  }, []);

  return (
    <article className="details">
      <section className="details__product">
        <h1 className="details__company">{product.brand.name}</h1>
        <h2 className="details__title">{product.name}</h2>
        <div
          className="details__description"
          dangerouslySetInnerHTML={{
            __html: product.brand.description || product.description || "",
          }}
        />

        <details>
          <summary>
            <span>Product Information</span>
          </summary>
          <article>
            {product.sizeGuide && (
              <a href={product.sizeGuide} target="_blank">
                Size Guide
              </a>
            )}

            <p>
              Gender: <span>{product.gender}</span>
            </p>
            <p>
              Colour: <span>{product.media.images[0].colour}</span>
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: product.description || "",
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: product.info.aboutMe || "",
              }}
            />
          </article>
        </details>
      </section>
      <section className="details__order">
        <div className="details__prices">
          <div className="details__now">
            <p className="price_now">{product.price.current.text}</p>
            {product.price.previous.value !== product.price.current.value && (
              <p className="details__discount">
                -
                {parseInt(
                  ((product.price.previous.value -
                    product.price.current.value) /
                    product.price.previous.value) *
                    100
                )}
                %
              </p>
            )}
          </div>
          {product.price.previous.value !== product.price.current.value && (
            <p className="details__before">{product.price.previous.text}</p>
          )}
        </div>
        <div style={{ paddingBottom: "1rem" }}>
          <Like
            id={product.id}
            name={product.name}
            image={`https://${product.media.images[0].url}`}
            price={product.price.current.value}
            gender={gender}
            styles={{
              fontSize: "3rem",
            }}
          />
        </div>
        <div className="details__product-quantity">
          <div className="input">
            <button className="input__minus" onClick={handleMinusQ}>
              -
            </button>
            <input
              className="input__number"
              type="number"
              value={productQ}
              readOnly
            />
            <button className="input__plus" onClick={handlePlusQ}>
              +
            </button>
          </div>
          <button className="details__button" onClick={handleCart}>
            <span className="material-symbols-outlined">add_shopping_cart</span>
            <span>Add to cart</span>
          </button>
        </div>
      </section>
    </article>
  );
};

export default ProductDetails;
