import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useCategories } from '../hooks/useCategories';

import './Aside.css';
const Aside = () => {
  const { pathname } = useLocation();
  let root = pathname.split('/')[1];
  let data = useCategories(root);
  const { refreshPage } = useContext(AuthContext);

  let categories = pathname.includes('sortBy') ? data : null;

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
                      className={'category__link'}
                      onClick={() =>
                        refreshPage(
                          `/categoryId=${cat.link.categoryId}/sortBy/%20/filter/%20/search/%20/offset/48`
                        )
                      }
                      id={cat.link.categoryId}
                    >
                      {cat.content.title.replace('SALE', '')}
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
