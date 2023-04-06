import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
const limit = 48;

const SortProduct = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { page, setPage, refreshPage } = useContext(AuthContext);
  const { res } = useLoaderData();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split('/');
  const root = path[1];

  useEffect(() => {
    if (Object.keys(res).length > 0 && res.hasOwnProperty('products')) {
      if (page > 1) {
        setItems([...items, ...res.products]);
      } else {
        setItems([...res.products]);
      }
    }
  }, [res, setItems]);

  useEffect(() => {
    let offset = page * limit;
    if (page > 1 && hasMore)
      navigate(
        `/${root}/sortBy/${path[3]}/filter/${path[5]}/search/${path[7]}/offset/${offset}`
      );

    if (offset >= res.itemCount) setHasMore(false);
  }, [page, hasMore, setHasMore]);
  return (
    <>
      <Filters facets={res.facets} refreshPage={refreshPage} />
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>You have seen it all</b>
          </p>
        }
      >
        <section className="content">
          {items.length > 0 &&
            items.map((product) => (
              <Link
                to={`/${root}/${product.id}`}
                key={product.id}
                className="product"
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
        </section>
      </InfiniteScroll>
    </>
  );
};

export default SortProduct;
