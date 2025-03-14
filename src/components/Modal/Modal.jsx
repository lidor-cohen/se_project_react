import './Modal.css';
import defaultCloseButtonImage from '../../assets/icons/close-button.svg';
import { useEffect, useState } from 'react';

function Modal({
  modalClass,
  modalCloseButton = defaultCloseButtonImage,
  onClose,
  children,
}) {
  function handleExitByESC(e) {
    if (e.key === 'Escape') onClose();
  }

  function handleExitByBackdrop(e) {
    if (e.target.classList.contains('modal')) onClose();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleExitByESC);
    document.addEventListener('click', handleExitByBackdrop);

    return () => {
      document.removeEventListener('keydown', handleExitByESC);
      document.removeEventListener('click', handleExitByBackdrop);
    };
  }, []);

  return (
    <div className={`modal ${modalClass}`}>
      <div className={`modal__container ${modalClass}__container`}>
        <img
          className="modal__close-button"
          src={modalCloseButton}
          alt="close button"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}

export default Modal;
