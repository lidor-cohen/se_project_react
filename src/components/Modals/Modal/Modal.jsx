// External
import './Modal.css';
import { useEffect, useRef, useState } from 'react';

// Components
import defaultCloseButtonImage from '../../../assets/icons/close-button.svg';

function Modal({
  modalClass,
  modalCloseButton = defaultCloseButtonImage,
  onClose,
  children,
}) {
  const modalRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  function closeModal() {
    setTimeout(() => {
      setIsVisible(false);
    }, 20);
    setTimeout(onClose, 200);
  }

  useEffect(() => {
    function handleExitByESC(e) {
      if (e.key === 'Escape') closeModal();
    }

    function handleExitByBackdrop(e) {
      if (e.target.classList.contains('modal')) closeModal();
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 20);

    document.addEventListener('keydown', handleExitByESC);
    document.addEventListener('click', handleExitByBackdrop);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleExitByESC);
      document.removeEventListener('click', handleExitByBackdrop);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className={`modal ${modalClass} ${isVisible ? 'modal--visible' : ''}`}
    >
      <div className={`modal__container ${modalClass}__container`}>
        <img
          className="modal__close-button"
          src={modalCloseButton}
          alt="close button"
          onClick={closeModal}
        />
        {children}
      </div>
    </div>
  );
}

export default Modal;
