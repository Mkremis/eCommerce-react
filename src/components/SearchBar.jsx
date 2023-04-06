import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import useSearch from '../hooks/useSearch';
import './SearchBar.css';
import reactStringReplace from 'react-string-replace';

const SearchBar = () => {
  const { refreshPage } = useContext(AuthContext);
  const [
    showSearchMobile,
    closeSearchMobile,
    search,
    setSearch,
    fetchSearch,
    setFetchSearch,
    suggestions,
  ] = useSearch();

  return (
    <>
      <div className="search-button_mobile-container">
        <button className="search-button_mobile" onClick={showSearchMobile}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button
          className="close-search-button_mobile --invisible"
          onClick={closeSearchMobile}
        >
          <span className="close-search-button_mobile-image">&times;</span>
        </button>
      </div>
      <div className="autocomplete">
        <input
          type="search"
          id="searchBar"
          className="search-bar"
          name="searchBar"
          placeholder="search for products.."
          value={search}
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
        />
        {suggestions && (
          <ul id="autocomplete-list" className="autocomplete-items">
            {suggestions.map((el, idx) => {
              return (
                <li key={idx} className="autocomplete-item">
                  {reactStringReplace(el, search, (match, i) => (
                    <strong key={i}>{match}</strong>
                  ))}
                  <input
                    type={'checkbox'}
                    value={el}
                    id={el}
                    className={'autocomplete-item__suggestion'}
                    onChange={(e) => {
                      refreshPage();
                      setFetchSearch(e.target.value);
                    }}
                    checked={fetchSearch === el}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchBar;
