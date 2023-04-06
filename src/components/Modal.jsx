import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ children, isOpen, closeModal, addClass }) => {
  const stopPropagation = (e) => e.stopPropagation();
  return ReactDOM.createPortal(
    <article
      className={`modal ${isOpen && 'is-open'} ${addClass}`}
      onClick={closeModal}
    >
      <div className="modal-container" onClick={stopPropagation}>
        <span
          className="material-symbols-outlined modal-close"
          onClick={closeModal}
        >
          close
        </span>

        {children}
      </div>
    </article>,
    document.getElementById('modal')
  );
};
export default Modal;
