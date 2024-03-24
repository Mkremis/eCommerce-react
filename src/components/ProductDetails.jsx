import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import Like from "./Like";
import "./ProductDetails.css";
import { cartRequests, productRequests } from "../api/clientRequests";

const ProductDetails = ({ product }) => {
  // Destructuring values from AuthContext
  const {
    cart,
    setCart,
    auth: user,
    currentProduct,
    currency,
  } = useContext(AuthContext);

  // State to manage the quantity of the product
  const [productQ, setProductQ] = useState(0);

  // State to hold price details of the current product
  const [priceDetails, setPriceDetails, priceFormat] = useState(currentProduct);

  // Getting the pathname from the current location
  const { pathname } = useLocation();

  // Extracting gender from the pathname
  const gender = pathname.split("/")[1];

  // Effect to update product quantity based on cart data
  useEffect(() => {
    if (cart) {
      const itemFound = Object.values(cart).find((item) => {
        const itemId = parseInt(item.prodId); // Convert to number
        const productId = parseInt(product.id); // Convert to number
        return itemId === productId;
      });
      if (itemFound) setProductQ(itemFound.productQ);
    }
  }, [product]);

  // Effect to fetch and update stock price details
  useEffect(() => {
    const getStockPrice = async (prodId) => {
      try {
        const response = await productRequests().getProductPrice({ prodId });
        setPriceDetails(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (!priceDetails || priceDetails.productId !== product.id)
      getStockPrice(product.id);
  }, [priceDetails, product]);

  // Function to handle cart operations
  function handleCart() {
    const addQ = () => {
      const newQ = productQ + 1;
      setProductQ(newQ);
      if (product.id in cart) updateCart({ newQ });
    };
    const subsQ = () => {
      const newQ = productQ - 1;
      productQ === 0 ? false : setProductQ(newQ);
      if (product.id in cart) updateCart({ newQ });
    };

    const updateCart = async ({ newQ = productQ }) => {
      const newCart = {
        prodId: product?.id,
        prodGender: gender,
        prodName: product?.name,
        prodImage: product?.media?.images[0]?.url,
        prodPrice: priceDetails.productPrice.current.value,
        priceCurrency: priceDetails.productPrice.currency,
        productQ: newQ,
      };
      if (user) {
        try {
          const response = await cartRequests().updateUserCart(newCart);
          const updatedUserCart = await response.data;
          setCart(updatedUserCart);
        } catch (error) {
          console.error("Error updating the user cart from the server:", error);
        }
      } else {
        const randomId = () => {
          const randomFactor = parseInt(Math.random() * 100000);
          const cartId = parseInt(Math.random() * randomFactor);
          return cartId;
        };
        const isCart = cart.find((item) => item.prodId === newCart.prodId);
        if (isCart) {
          // Actualizar elemento existente
          const updatedCart = cart.map((item) =>
            item.prodId === newCart.prodId ? { ...item, ...newCart } : item
          );
          setCart(updatedCart);
        } else {
          // Agregar nuevo elemento al carrito
          setCart([...cart, { id: randomId(), ...newCart }]);
        }
      }
    };

    return { addQ, subsQ, updateCart };
  }

  // Effect to set product quantity from cart data
  useEffect(() => {
    Object.keys(cart).some((key) => parseInt(key) === product.id) &&
      setProductQ(cart[product?.id].productQ);
  }, [product]);

  return (
    <article className="details">
      <section className="details__product">
        {/* Product details */}
        <h1 className="details__company">{product?.brand?.name}</h1>
        <h2 className="details__title">{product?.name}</h2>
        <div
          className="details__description"
          dangerouslySetInnerHTML={{
            __html: product?.brand?.description || product?.description || "",
          }}
        />

        {/* Additional product information */}
        <details>
          <summary>
            <span>Product Information</span>
          </summary>
          <article>
            {product?.sizeGuide && (
              <a href={product?.sizeGuide} target="_blank">
                Size Guide
              </a>
            )}

            <p>
              Gender: <span>{product?.gender}</span>
            </p>
            <p>
              Colour: <span>{product?.media?.images[0]?.colour}</span>
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: product?.description || "",
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: product?.info?.aboutMe || "",
              }}
            />
          </article>
        </details>
      </section>
      <section className="details__order">
        {/* Product prices */}
        {priceDetails ? (
          <div className="details__prices">
            <div className="details__now">
              <p className="price_now">
                {priceDetails.productPrice?.current?.text}
              </p>
              {priceDetails.productPrice.previous?.value !==
                priceDetails.productPrice.current.value && (
                <p className="details__discount">
                  -
                  {parseInt(
                    ((priceDetails.productPrice.previous?.value -
                      priceDetails.productPrice.current.value) /
                      priceDetails.productPrice.previous?.value) *
                      100
                  )}
                  %
                </p>
              )}
            </div>
            {priceDetails.productPrice.previous?.value !==
              priceDetails.productPrice.current.value && (
              <p className="details__before">
                {priceDetails.productPrice.previous?.text}
              </p>
            )}
          </div>
        ) : (
          <p>Loading price...</p>
        )}

        {/* Product like button */}
        <div style={{ paddingBottom: "1rem" }}>
          <Like
            prodId={product?.id}
            prodName={product?.name}
            prodGender={product?.gender}
            prodImage={`https://${product?.media?.images[0]?.url}`}
            prodPrice={priceDetails?.productPrice?.current?.value}
            priceCurrency={priceDetails?.productPrice?.currency}
            styles={{
              fontSize: "3rem",
            }}
          />
        </div>
        {/* Product quantity input and add to cart button */}
        <div className="details__product-quantity">
          <div className="input">
            <button
              className="input__minus"
              onClick={handleCart().subsQ}
              disabled={productQ === 0 ? true : false}
            >
              -
            </button>
            <input
              className="input__number"
              type="number"
              value={productQ}
              readOnly
            />
            <button className="input__plus" onClick={handleCart().addQ}>
              +
            </button>
          </div>
          <button className="details__button" onClick={handleCart().updateCart}>
            <span className="material-symbols-outlined">add_shopping_cart</span>
            <span>Add to cart</span>
          </button>
        </div>
      </section>
    </article>
  );
};

export default ProductDetails;
