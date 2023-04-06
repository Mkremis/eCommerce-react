import React from "react";

const About = () => {
  const styles = {
    textAlign: "center",
    width: "70vw",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  };
  return (
    <article style={styles}>
      <br />
      <h1>Who we are.</h1>
      <br />
      <p>
        We believe in a world where you have total freedom to be you, without
        judgement. To experiment. To express yourself. To be brave and grab life
        as the extraordinary adventure it is. So we make sure everyone has an
        equal chance to discover all the amazing things they’re capable of – no
        matter who they are, where they’re from or what looks they like to boss.
        We exist to give you the confidence to be whoever you want to be.
      </p>
      <br />
      <br />

      <picture>
        <source
          srcSet="https://content.asos-media.com/-/media/homepages/ww/2023/january/30-prime/ww/hero/gbl---wk24/ww-hp-mo-ww-640x692.jpg"
          media="(max-width: 768px)"
          width="640"
          height="692"></source>
        <img
          className="hero__image"
          src="https://content.asos-media.com/-/media/homepages/ww/2023/january/30-prime/ww/hero/gbl---wk24/ww-hp-desktop-ww-1258x600.jpg"
          alt=""
          width="1258"
          height="600"></img>
      </picture>
    </article>
  );
};

export default About;
