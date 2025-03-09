import './ItemModal.css';
import closeButtonImage from '../../assets/icons/close-button.svg';
import { useEffect } from 'react';

function ItemModal(props) {
  function handleClose(evt) {
    const modal = evt.target.closest('.item-modal');
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 500);
  }

  useEffect(() => {
    const modal = document.querySelector('.item-modal');
    modal.style.opacity = '1';
  }, []);

  return (
    <div className="item-modal">
      <div className="item-modal__container">
        <img
          className="item-modal__close-button"
          src={closeButtonImage}
          alt="close button"
          onClick={handleClose}
        />
        <img
          src={new URL(props.image, import.meta.url).href}
          alt="item image"
          className="item-modal__image"
        />
        <div className="item-modal__description">
          <p className="item-modal__title">{props.title}</p>
          <p className="item-modal__weather">
            Weather: {props.weatherCondition}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
