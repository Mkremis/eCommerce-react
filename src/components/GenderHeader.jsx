import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./GenderHeader.css";
const GenderHeader = ({ gender }) => {
  const images = {
    men: {
      mobile:
        "https://images.asos-media.com/navigation/mw_homebuttonnew_1826147",
      desktop:
        "https://images.asos-media.com/navigation/mw_homebuttonnew_1826147",
    },
    women: {
      mobile:
        "https://images.asos-media.com/navigation/ww-gl-home-june-refresh-1m",
      desktop:
        "https://images.asos-media.com/navigation/ww-gl-home-june-refresh-1m",
    },
  };

  const { refreshPage } = useContext(AuthContext);
  const handleLink = () => {
    refreshPage(
      `/${gender}/category/%20/sortBy/sort=freshness/filter/%20/search/%20/offset/48`
    );
  };
  return (
    <div className="gender-header">
      <picture>
        <source media="(min-width:415px)" srcSet={images[gender].desktop} />
        <source media="(max-width:415px)" srcSet={images[gender].mobile} />
        <div className="gender-header_img-container" onClick={handleLink}>
          <img alt={gender} src={images[gender].mobile} />
          <span className="gender-title">{gender}</span>
        </div>
      </picture>
    </div>
  );
};

export default GenderHeader;
