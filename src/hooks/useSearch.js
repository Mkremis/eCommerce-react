import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { options } from "../api/apiConfig"
import axios from "axios";

const useSearch = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [fetchSearch, setFetchSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (search.length === 0) {
      setSuggestions(null);
      setFetchSearch("");
      setSearch("");
    }
    if (search.length > 2 && !fetchSearch) {
      const URL = `https://asos2.p.rapidapi.com/v2/auto-complete?q=${search}&store=US&country=US&currency=USD&sizeSchema=US&lang=en-US`;
      axios
        .get(URL, options)
        .then((res) =>
          setSuggestions(
            res.data.suggestionGroups[0].suggestions.map((obj) => obj.searchTerm)
          )
        );
    }
  }, [search]);

  useEffect(() => {
    if (fetchSearch) {
      setSearch(fetchSearch);
      navigate(
        `search-page/category/%20/sortBy/%20/filter/%20/search/q=${fetchSearch}/offset/48`
      );
      setSuggestions(null);
    }
  }, [fetchSearch]);

  const showSearchMobile = () => {
    document.querySelector(".autocomplete").style.display = "flex";
    document
      .querySelector(".close-search-button_mobile")
      .classList.toggle("--invisible");
    document
      .querySelector(".search-button_mobile")
      .classList.toggle("--invisible");
    document
      .querySelector(".header__navigation")
      .classList.toggle("--invisible");
  };
  const closeSearchMobile = () => {
    document.querySelector(".autocomplete").style.display = "none";
    document
      .querySelector(".close-search-button_mobile")
      .classList.toggle("--invisible");
    document
      .querySelector(".search-button_mobile")
      .classList.toggle("--invisible");
    document
      .querySelector(".header__navigation")
      .classList.toggle("--invisible");
  };
  return [
    showSearchMobile,
    closeSearchMobile,
    search,
    setSearch,
    fetchSearch,
    setFetchSearch,
    suggestions,
  ];
};
export default useSearch;
