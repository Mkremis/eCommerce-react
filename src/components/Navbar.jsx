import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

import './Navbar.css';

const Navbar = () => {
  const { refreshPage } = useContext(AuthContext);
  const handleLink = (e) => {
    refreshPage(e.target.getAttribute('data-to'));
  };
  return (
    <nav className="nav-bar">
      <ul className="navbar__items">
        <li>
          <span
            className="navbar__link"
            data-to="/women/sortBy/sort=freshness/filter/%20/search/%20/offset/48"
            onClick={handleLink}
          >
            Women
          </span>
        </li>
        <li>
          <span
            className="navbar__link"
            data-to="/men/sortBy/sort=freshness/filter/%20/search/%20/offset/48"
            onClick={handleLink}
          >
            Men
          </span>
        </li>
        <li>
          <span
            className="navbar__link"
            data-to="/sneakers/sortBy/sort=freshness/filter/%20/search/%20/offset/48"
            onClick={handleLink}
          >
            Sneakers
          </span>
        </li>
        <li>
          <span className="navbar__link" data-to="/about" onClick={handleLink}>
            About
          </span>
        </li>
        <li>
          <span
            className="navbar__link"
            id="contact"
            data-to="/contact"
            onClick={handleLink}
          >
            Contact
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
