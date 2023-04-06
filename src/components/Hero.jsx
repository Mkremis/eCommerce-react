import React from "react";

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero__imageWrap">
        <picture>
          <source
            srcSet="https://content.asos-media.com/-/media/homepages/ww/2022/nov/07/hero/ww_global_party_mobhero_640x692-(1).jpg"
            media="(max-width: 768px)"
            width="640"
            height="692"
          />
          <img
            className="hero__image"
            src="https://content.asos-media.com/-/media/homepages/ww/2022/nov/07/hero/img26631258-x-600-desktop.jpg"
          />
        </picture>
      </div>
    </section>
  );
};

export default Hero;
