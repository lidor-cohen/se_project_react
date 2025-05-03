// External
import './AddItemModal.css';
import { useEffect, useState, useContext, useRef } from 'react';

// Components
import ModalWithForm from '../ModalWithForm';

// Contexts
import { CurrentClothingItemsContext } from '../../../../contexts/CurrentClothingItemsContext';

const DEFAULT_WEATHER_TYPE = 'hot'; // Options: hot, cold, warm

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const [nameInput, setNameInput] = useState('');
  const nameInputLabel = useRef();

  const [imageUrlInput, setImageUrlInput] = useState('');
  const imageInputLabel = useRef();

  const [weatherTypeInput, setWeatherTypeInput] =
    useState(DEFAULT_WEATHER_TYPE);

  const [formErrors, setFormErrors] = useState('nameimage');
  const [buttonText, setButtonText] = useState('Add garment');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { currentClothingItems } = useContext(CurrentClothingItemsContext);

  useEffect(() => {
    function resetFields() {
      setNameInput('');
      setImageUrlInput('');
      setWeatherTypeInput(DEFAULT_WEATHER_TYPE);
    }

    resetFields();
  }, [isOpen]);

  function onChangeNameHandler(e) {
    if (!e.target.validity.valid) {
      nameInputLabel.current.innerHTML = `Name (${e.target.validationMessage})`;
      nameInputLabel.current.classList.add('form__label-error');
      e.target.classList.add('form__input-error');
      if (!formErrors.includes('name')) setFormErrors(formErrors + 'name');
    } else {
      nameInputLabel.current.innerHTML = `Name`;
      nameInputLabel.current.classList.remove('form__label-error');
      e.target.classList.remove('form__input-error');
      setFormErrors(formErrors.replace('name', ''));
    }

    setNameInput(e.target.value);
  }

  function onChangeImageHandler(e) {
    if (!e.target.validity.valid) {
      imageInputLabel.current.innerHTML = `Image (${e.target.validationMessage})`;
      imageInputLabel.current.classList.add('form__label-error');
      e.target.classList.add('form__input-error');
      if (!formErrors.includes('image')) setFormErrors(formErrors + 'image');
    } else {
      imageInputLabel.current.innerHTML = `Image`;
      imageInputLabel.current.classList.remove('form__label-error');
      e.target.classList.remove('form__input-error');
      setFormErrors(formErrors.replace('image', ''));
    }

    setImageUrlInput(e.target.value);
  }

  function onChangeWeatherTypeHandler(e) {
    setWeatherTypeInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formErrors === '') {
      onAddItem({
        _id:
          currentClothingItems.length > 0
            ? currentClothingItems.at(-1)._id + 1
            : 0,
        name: nameInput,
        weather: weatherTypeInput,
        imageUrl: imageUrlInput,
      });
    } else {
      setTimeout(() => {
        setButtonText('Add garment');
        setButtonDisabled(false);
      }, 2000);
      setButtonText('Form Invalid, Try Again');
      setButtonDisabled(true);
    }
  }

  return (
    isOpen && (
      <ModalWithForm
        title="Add garment"
        name="garment"
        onClose={onCloseModal}
        buttonText={buttonText}
        onSubmit={handleSubmit}
        isButtonDisabled={buttonDisabled}
      >
        <div className="form-modal__input-container">
          <label
            ref={nameInputLabel}
            htmlFor="garmentName"
            className="form-modal__label"
          >
            Name
          </label>
          <input
            required
            minLength={2}
            maxLength={20}
            id="garmentName"
            placeholder="Name"
            type="text"
            value={nameInput}
            className="form-modal__input form-modal__input_type_text"
            onChange={onChangeNameHandler}
          />
        </div>

        <div className="form-modal__input-container">
          <label
            ref={imageInputLabel}
            htmlFor="garmentImageURL"
            className="form-modal__label"
          >
            Image
          </label>
          <input
            required
            id="garmentImageURL"
            placeholder="Image URL"
            type="url"
            value={imageUrlInput}
            className="form-modal__input form-modal__input_type_text"
            onChange={onChangeImageHandler}
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
              onChange={onChangeWeatherTypeHandler}
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
              onChange={onChangeWeatherTypeHandler}
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
              onChange={onChangeWeatherTypeHandler}
            />
            <label htmlFor="cold-weather" className="form-modal__label-radio">
              Cold
            </label>
          </div>
        </div>
      </ModalWithForm>
    )
  );
}

export default AddItemModal;
