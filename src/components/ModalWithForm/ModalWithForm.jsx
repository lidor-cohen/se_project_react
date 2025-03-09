import { useEffect } from 'react';
import closeButtonImage from '../../assets/icons/close-button-gray.svg';
import './ModalWithForm.css';

function ModalWithForm(props) {
  useEffect(() => {
    const modal = document.querySelector('.form-modal');
    modal.style.opacity = '1';
  }, []);

  return (
    <div className="form-modal">
      <div className="form-modal__container">
        <img
          className="form-modal__close-button"
          src={closeButtonImage}
          alt="close button"
          onClick={props.onClose}
        />
        <h2 className="form-modal__header">{props.name}</h2>
        <form
          className={`form-modal__form form-modal_type_${props.name}`}
          onSubmit={(evt) => {
            evt.preventDefault();
          }}
          noValidate
        >
          {props.elements}
          <div className="form-modal__input-container">
            <label className="form-modal__label">Name</label>
            <input
              placeholder="Name"
              type="text"
              className="form-modal__input form-modal__input_type_text"
            />
          </div>

          <div className="form-modal__input-container">
            <label className="form-modal__label">Image</label>
            <input
              placeholder="Image URL"
              type="text"
              className="form-modal__input form-modal__input_type_text"
            />
          </div>

          <div className="form-modal__input-container">
            <p className="form-modal__label">Select the weather type:</p>

            <div className="form-modal__radio-container">
              <input
                className="form-modal__input_type_radio"
                type="radio"
                id="hot-weather"
                name="weather"
                value="hot"
                defaultChecked
              />
              <label htmlFor="hot-weather" className="form-modal__label-radio">
                Hot
              </label>
            </div>

            <div className="form-modal__radio-container">
              <input
                className="form-modal__input_type_radio"
                type="radio"
                id="warm-weather"
                name="weather"
                value="warm"
              />
              <label htmlFor="warm-weather" className="form-modal__label-radio">
                Warm
              </label>
            </div>

            <div className="form-modal__radio-container">
              <input
                className="form-modal__input_type_radio"
                type="radio"
                id="cold-weather"
                name="weather"
                value="cold"
              />
              <label htmlFor="cold-weather" className="form-modal__label-radio">
                Cold
              </label>
            </div>
          </div>

          <button
            disabled
            className="button-primary form-modal__submit"
            type="submit"
          >
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
