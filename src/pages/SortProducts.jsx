import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import ProductFooter from "../components/ProductFooter";
const limit = 48;

const SortProduct = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { page, setPage, refreshPage } = useContext(AuthContext);
  const { res } = useLoaderData();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const root = path[1];

  useEffect(() => {
    if (res && Object.keys(res).length > 0 && res.hasOwnProperty("products")) {
      if (page > 1) {
        setItems([...items, ...res.products]);
      } else {
        setItems([...res.products]);
      }
    }
  }, [res, setItems]);

  useEffect(() => {
    let offset = page * limit;
    if (page === 1) window.scrollTo(0, 0);
    if (page > 1 && hasMore) {
      navigate(
        `/${root}/category/${path[3]}/sortBy/${path[5]}/filter/${path[7]}/search/${path[9]}/offset/${offset}`
      );
    }
    if (offset >= res.itemCount) setHasMore(false);
  }, [page, hasMore, setHasMore]);
  return (
    <>
      {res && res.facets && (
        <Filters facets={res.facets} refreshPage={refreshPage} />
      )}
      <section className="content">
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={() => setPage(page + 1)}
          hasMore={hasMore}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "baseline",
            overflow: "hidden",
          }}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You have seen it all</b>
            </p>
          }
        >
          {items.length > 0 &&
            items.map((product) => {
              if (product.productType === "Product") {
                return (
                  <section className="product" key={product.id}>
                    <Link to={`/${root}/${product.id}`}>
                      <ProductCard
                        image={`https://${product.imageUrl}`}
                        name={product.name}
                        price_curr={product.price.current.text}
                        id={product.id}
                      />
                    </Link>
                    <ProductFooter
                      price={product.price.current.text}
                      id={product.id}
                      name={product.name}
                      image={`https://${product.imageUrl}`}
                      gender={root}
                    />
                  </section>
                );
              }
            })}
        </InfiniteScroll>
      </section>
    </>
  );
};

export default SortProduct;
