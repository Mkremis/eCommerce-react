import React from 'react';
import './MenuFilters.css';
import colors from 'color-name';
import useFilters from '../hooks/useFilters';

const MenuFilters = ({ facets, closeModalTop, refreshPage }) => {
  const {
    menu,
    setMenu,
    subMenu,
    setSubMenu,
    isMenu,
    filters,
    showFilters,
    selectedItems,
    handleMenuChange,
    handleSubMenuChange,
    handleFilter,
    handleClear,
   } = useFilters(facets, refreshPage);

  const handleBack = () => {
    if (menu) {
      closeModalTop(true);
    } else {
      setMenu(facets);
      setSubMenu(null);
    }
  };

  return (
    <>
      <header className="filter__mobile-header">
        <div className="filter__mobile-back">
          <div className="filter__select">
            <span className="material-symbols-outlined" onClick={handleBack}>
              {menu ? 'close' : 'arrow_back'}
            </span>
          </div>
        </div>
        <div className="filter_selection" onClick={handleFilter}>
          <div className="filter__select">
            <span className="material-symbols-outlined">filter_list</span>
            <span>Filter</span>
          </div>
        </div>
        <div className="filter-clear" onClick={handleClear}>
          <div className="filter__select">
            <span className="material-symbols-outlined">filter_list_off</span>
            <span>Clear</span>
          </div>
        </div>
      </header>
      <ul className="filter-categories">
        {menu &&
          menu.map(({ id, name }, index) => (
            <li key={id}>
              <label className="filter-menu_description">
                <input
                  className="filter-menu"
                  type="checkbox"
                  id={index}
                  name={name}
                  value={id}
                  onChange={handleMenuChange}
                />
                <span>{name}</span>
              </label>
              <span className="show-filter">{showFilters[id]}</span>
            </li>
          ))}
        {subMenu &&
          subMenu.map(({ id, name, count }) => {
            return (
              <li key={`${id}_${name}`}>
                <label className="filter-sub_menu_description">
                  {isMenu.value === 'base_colour' && (
                    <div
                      className="filter-sub_menu_colour"
                      style={{
                        backgroundColor: `rgb(${colors[name.toLowerCase()]})`,
                      }}
                    ></div>
                  )}
                  <input
                    className="filter-sub_menu"
                    type="checkbox"
                    id={name}
                    name={isMenu.value}
                    value={id}
                    onChange={handleSubMenuChange}
                    checked={selectedItems.includes(name)}
                  />
                  <span className="name">{name}</span>
                  <span className="filter-count">{count}</span>
                </label>
              </li>
            );
          })}
      </ul>
    </>
  );
};
export default MenuFilters;
