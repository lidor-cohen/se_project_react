import './ItemModal.css';
import closeButtonImage from '../../assets/icons/close-button.svg';
import Modal from '../Modal/Modal';

function ItemModal({ image, title, weatherCondition, onClose }) {
  return (
    <Modal
      modalClass="item-modal"
      modalCloseButton={closeButtonImage}
      onClose={onClose}
    >
      <img
        src={new URL(image, import.meta.url).href}
        alt="item image"
        className="item-modal__image"
      />
      <div className="item-modal__description">
        <p className="item-modal__title">{title}</p>
        <p className="item-modal__weather">Weather: {weatherCondition}</p>
      </div>
    </Modal>
  );
}

export default ItemModal;
