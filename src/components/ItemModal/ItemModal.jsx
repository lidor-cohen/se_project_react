import './ItemModal.css';
import closeButtonImage from '../../assets/icons/close-button.svg';
import { useEffect } from 'react';

function ItemModal({ image, title, weatherCondition, onClose }) {
  function handleExitByESC(e) {
    if (e.key === 'Escape') onClose();
  }

  function handleExitByBackdrop(e) {
    if (e.target.classList.contains('item-modal')) onClose();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleExitByESC);
    document.addEventListener('click', handleExitByBackdrop);
  }, []);

  return (
    <div className="item-modal">
      <div className="item-modal__container">
        <img
          className="item-modal__close-button"
          src={closeButtonImage}
          alt="close button"
          onClick={onClose}
        />
        <img
          src={new URL(image, import.meta.url).href}
          alt="item image"
          className="item-modal__image"
        />
        <div className="item-modal__description">
          <p className="item-modal__title">{title}</p>
          <p className="item-modal__weather">Weather: {weatherCondition}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
