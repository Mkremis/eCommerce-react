import React, { useRef } from 'react';
import './ProductGallery.css';

const ProductGalleryModal = ({ product, current }) => {
  
  console.log('current',current);
  let galleryModal = product.media.images[0].url;
  let { images } = product.media;
  const modalPoster = useRef(null);
  const handleClickModal = (e) => {
    modalPoster.current.src = e.target.src;
  };
  return (
    <article className="gallery">
      <div className="gallery__image-container">
        <img
          src={current}
          //src={`https://${galleryModal}`}
          className="gallery__image"
          ref={modalPoster}
        />
      </div>
      <div className="gallery__thumnails">
        {images.map((image, index) => (
          <img
            key={`thumnail_${index}`}
            id={index + 1}
            className="gallery__thumnail"
            src={`https://${image.url}`}
            onClick={handleClickModal}
          />
        ))}
      </div>
    </article>
  );
};

export default ProductGalleryModal;
