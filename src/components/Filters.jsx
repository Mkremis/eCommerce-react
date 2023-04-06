import React from 'react';
import './Filter.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useModal } from '../hooks/useModal';
import ModalTop from './ModalTop';
import MenuFilters from './MenuFilters';

const Filters = ({ facets, refreshPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let path = location.pathname.split('/');
  let rootPath = path[1];
  const handleMenu = () =>
    isOpenModalTop ? closeModalModalTop(true) : openModalTop(true);
  const [isOpenModalTop, openModalTop, closeModalModalTop] = useModal(false);
  const closeMenuFilters = (close) => (close ? closeModalModalTop() : false);
  const handleSort = (e) => {
    refreshPage();
    navigate(
      `/${rootPath}/sortBy/sort=${e.target.value}/filter/${path[5]}/search/${path[7]}/offset/48`
    );
  };
  return (
    <>
      <aside className="sort-filter__mobile">
        <section className="sort__mobile">
          <select
            name="sortBy"
            id="sortBy"
            className="sort-select__mobile"
            onChange={handleSort}
          >
            <option value>SORT</option>
            <option value="recommended">Recommended</option>
            <option value="freshness">What's new</option>
            <option value="pricedesc">Price high to low</option>
            <option value="priceasc">Price low to high</option>
          </select>
        </section>
        <section className="filter">
          <button className="filter-button__mobile" onClick={handleMenu}>
            Filter
          </button>
        </section>
      </aside>
      <ModalTop
        isOpen={isOpenModalTop}
        closeModal={closeModalModalTop}
        stylesModal={{ justifyContent: 'right', alignItems: 'flex-start' }}
        stylesClose={{ right: '100%' }}
        classContainer="filter__mobile"
      >
        <MenuFilters
          facets={facets}
          closeModalTop={closeMenuFilters}
          refreshPage={refreshPage}
        />
      </ModalTop>
    </>
  );
};

export default Filters;
