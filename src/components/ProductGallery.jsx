import React, { useRef, useState } from 'react';
import { useModal } from '../hooks/useModal';
import Modal from './Modal';
import './ProductGallery.css';
import ProductGalleryModal from './ProductGalleryModal';

const ProductGallery = ({ product }) => {
  const [indexImg, setIndexImg] = useState(0);
  let gallery = product.media.images[indexImg].url;
  let { images } = product.media;
  const poster = useRef(null);
  const handleClick = (e) => {
    poster.current.src = e.target.src;
  };
  const handleNext = () => {
    indexImg === images.length - 1 ? setIndexImg(0) : setIndexImg(indexImg + 1);
  };
  const handlePrev = () => {
    indexImg === 0 ? setIndexImg(images.length - 1) : setIndexImg(indexImg - 1);
  };
  const [isOpenModalGallery, openModalGallery, closeModalGallery] =
    useModal(false);
  return (
    <>
      <article className="gallery">
        <div className="gallery__image-container">
          <img
            src={`https://${gallery}`}
            className="gallery__image"
            ref={poster}
            onClick={openModalGallery}
          />
          <div className="gallery__previous">
            <span className="material-symbols-outlined" onClick={handlePrev}>
              arrow_back_ios
            </span>
          </div>
          <div className="gallery__next">
            <span className="material-symbols-outlined " onClick={handleNext}>
              arrow_forward_ios
            </span>
          </div>
        </div>
        <div className="gallery__thumnails">
          {images.map((image, index) => (
            <img
              key={`thumnail_${index}`}
              id={index + 1}
              className="gallery__thumnail"
              src={`https://${image.url}`}
              onClick={handleClick}
            />
          ))}
        </div>
      </article>
      <Modal isOpen={isOpenModalGallery} closeModal={closeModalGallery}>
        {console.log(poster.current.src)}
        <ProductGalleryModal product={product} current={poster.current.src} />
      </Modal>
    </>
  );
};

export default ProductGallery;
