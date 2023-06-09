import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useFilters = (facets, refreshPage) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(facets);
  const [isMenu, setIsMenu] = useState(null);
  const [subMenu, setSubMenu] = useState(null);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  const handleMenuChange = ({ target }) => {
    let { id, name, value } = target;
    setSubMenu(menu[id].facetValues);
    setMenu(null);
    setIsMenu({ id, name, value });
  };
  const handleSubMenuChange = ({ target }) => {
    let { name, id, value } = target;
    // handle the checked status of the input
    let newSelected = [];
    if (selectedItems.includes(id)) {
      newSelected = [...selectedItems.filter((item) => item !== id)];
    } else {
      newSelected = [...selectedItems, id];
    }
    setSelectedItems(newSelected);

    //set the state object that contains every selected option into the facet category
    if (target.checked) {
      if (!filters[name]) {
        setShowFilters({ ...showFilters, [name]: `${id}| ` });
        setFilters({ ...filters, [name]: [value] });
      } else {
        setShowFilters({
          ...showFilters,
          [name]: [...showFilters[name], `${id}| `],
        });
        setFilters({ ...filters, [name]: [...filters[name], value] });
      }
    } else {
      let removeFilter = filters[name].filter((el) => el !== value);
      let removeShowF = filters[name].filter((el) => el !== `${id}| `);
      setShowFilters({ ...showFilters, [name]: [...removeShowF] });
      setFilters({ ...filters, [name]: [...removeFilter] });
    }
  };

  const handleFilter = () => {
    let query = "";
    for (const filter in filters) {
      query += `${filter}=${filters[filter].slice().join(",")}`;
    }
    const path = location.pathname.split("/");
    refreshPage();
    console.log("query ", query);
    navigate(
      `/${path[1]}/category/${path[3]}/sortBy/${path[5]}/filter/${query}/search/${path[9]}/offset/48`
    );
  };
  const handleClear = () => {
    setFilters({});
    setSelectedItems([]);
    setShowFilters([]);
  };
  return {
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
  };
};
export default useFilters;
