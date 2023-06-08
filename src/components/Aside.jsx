import React, { useContext, useEffect, useState } from "react";
import { options } from "../helpers/api";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import "./Aside.css";
const Aside = () => {
  const { pathname } = useLocation();
  const [response, setResponse] = useState(null);
  const [categories, setCategories] = useState(null);
  let root = pathname.split("/")[1];
  const { refreshPage } = useContext(AuthContext);

  options.method = "GET";
  // let categories = pathname.includes("sortBy") ? data : null;
  useEffect(() => {
    fetch(
      "https://asos2.p.rapidapi.com/categories/list?country=US&lang=en-US",
      options
    )
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setResponse(data))
      .catch((err) => console.log("Error reading aside categories", err));
  }, []);

  useEffect(() => {
    let dataPath;
    if (response && pathname.includes("sortBy")) {
      dataPath = {
        men: {
          url: response.navigation[0].children[4].children[3].children[1]
            .children,
        },
        women: {
          url: response.navigation[1].children[4].children[3].children[1]
            .children,
        },
      };
      setCategories(dataPath[root].url);
    } else {
      setCategories(null);
    }
  }, [pathname, root, response]);

  return (
    <>
      {categories && (
        <aside id="nav-bar__aside">
          <nav className="modal__sub-nav-bar">
            <ul className="nav__category-items">
              <header className="asideHeader">{root}</header>
              {categories.map((cat) => {
                return (
                  <li key={`${cat.content.title}_${cat.link.categoryId}`}>
                    <button
                      className={"category__link"}
                      onClick={() =>
                        refreshPage(
                          `/categoryId=${cat.link.categoryId}/sortBy/%20/filter/%20/search/%20/offset/48`
                        )
                      }
                      id={cat.link.categoryId}
                    >
                      {cat.content.title.replace("SALE", "")}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
};
export default Aside;
