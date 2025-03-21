import './AddItemModal.css';

import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useEffect, useState, useContext } from 'react';

import { CurrentClothingItemsContext } from '../../contexts/CurrentClothingItemsContext';

const DEFAULT_WEATHER_TYPE = 'hot'; // Options: hot, cold, warm

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const [nameInput, setNameInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [weatherTypeInput, setWeatherTypeInput] =
    useState(DEFAULT_WEATHER_TYPE);

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
    setNameInput(e.target.value);
  }

  function onChangeImageHandler(e) {
    setImageUrlInput(e.target.value);
  }

  function onChangeWeatherTypeHandler(e) {
    setWeatherTypeInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({
      _id: currentClothingItems.length + 1,
      name: nameInput,
      weather: weatherTypeInput,
      imageUrl: imageUrlInput,
    });
  }

  return (
    isOpen && (
      <ModalWithForm
        title="Add garment"
        name="garment"
        onClose={onCloseModal}
        buttonText="Add garment"
        onSubmit={handleSubmit}
      >
        <div className="form-modal__input-container">
          <label htmlFor="garmentName" className="form-modal__label">
            Name
          </label>
          <input
            id="garmentName"
            placeholder="Name"
            type="text"
            className="form-modal__input form-modal__input_type_text"
            onChange={onChangeNameHandler}
          />
        </div>

        <div className="form-modal__input-container">
          <label htmlFor="garmentImageURL" className="form-modal__label">
            Image
          </label>
          <input
            id="garmentImageURL"
            placeholder="Image URL"
            type="text"
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
