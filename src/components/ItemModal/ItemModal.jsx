import './ItemModal.css';
import closeButtonImage from '../../assets/icons/close-button.svg';

function ItemModal({ image, title, weatherCondition, onClose }) {
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
