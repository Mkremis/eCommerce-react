import React from 'react';
import ReactDOM from 'react-dom';
import './ModalTop.css';

const ModalTop = ({
  children,
  isOpen,
  closeModal,
  stylesModal,
  stylesClose,
  classContainer,
}) => {
  const stopPropagation = (e) => e.stopPropagation();
  return ReactDOM.createPortal(
    <article
      className={`modal_top ${isOpen && 'is-open'}`}
      onClick={closeModal}
      style={stylesModal}
    >
      <div
        className={` ${classContainer || 'modal_top-container'}`}
        onClick={stopPropagation}
      >
        <button
          className="modal_top-close"
          onClick={closeModal}
          style={stylesClose}
        >
          &times;
        </button>
        {children}
      </div>
    </article>,
    document.getElementById('modal')
  );
};
export default ModalTop;
