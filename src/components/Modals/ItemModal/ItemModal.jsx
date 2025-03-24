import './ItemModal.css';
import closeButtonImage from '../../../assets/icons/close-button.svg';
import Modal from '../Modal/Modal';
import { useState } from 'react';

function ItemModal({ image, title, weatherCondition, onDelete, onClose }) {
  const [deleteConfimationActive, setDeleteConfimationActive] = useState(false);

  return (
    <>
      {deleteConfimationActive && (
        <Modal
          modalClass="delete-modal"
          modalCloseButton={closeButtonImage}
          onClose={onClose}
        >
          <div className="delete-modal__wrapper">
            <p className="delete-modal__text">
              Are you sure you want to delete this item? This action is
              irreversible.
            </p>
            <button
              onClick={onDelete}
              className="delete-modal__button delete-modal__delete-confirm"
            >
              Yes, delete item
            </button>
            <button
              onClick={() => {
                setDeleteConfimationActive(false);
              }}
              className="delete-modal__button delete-modal__delete-regret"
            >
              Go back
            </button>
          </div>
        </Modal>
      )}

      {!deleteConfimationActive && (
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
            <div className="item-modal__info">
              <span className="item-modal__title">{title}</span>
              <span className="item-modal__weather">
                Weather: {weatherCondition}
              </span>
            </div>
            <div className="item-modal__actions">
              <button
                onClick={() => {
                  setDeleteConfimationActive(true);
                }}
                className="item-modal__delete-button"
              >
                Delete Item
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ItemModal;
