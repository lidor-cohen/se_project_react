// External
import './AddItemModal.css';
import { useEffect, useState, useContext } from 'react';

// Components
import ModalWithForm from '../ModalWithForm';
import FormInput from '../../../UI/FormElements/FormInput';
import FormRadioGroup from '../../../UI/FormElements/FormRadioGroup';

// Contexts
import { CurrentClothingItemsContext } from '../../../../contexts/CurrentClothingItemsContext';

const DEFAULT_WEATHER_TYPE = 'hot'; // Options: hot, cold, warm

function AddItemModal({ isOpen, onAddItem, closeModal }) {
  const [nameInput, setNameInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [weatherTypeInput, setWeatherTypeInput] =
    useState(DEFAULT_WEATHER_TYPE);
  const [formErrors, setFormErrors] = useState({ name: true, image: true });
  const [buttonText, setButtonText] = useState('Add garment');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { currentClothingItems } = useContext(CurrentClothingItemsContext);

  const weatherOptions = [
    { id: 'hot-weather', value: 'hot', label: 'Hot' },
    { id: 'warm-weather', value: 'warm', label: 'Warm' },
    { id: 'cold-weather', value: 'cold', label: 'Cold' },
  ];

  useEffect(() => {
    function resetFields() {
      setNameInput('');
      setImageUrlInput('');
      setWeatherTypeInput(DEFAULT_WEATHER_TYPE);
      setFormErrors({ name: true, image: true });
      setButtonText('Add garment');
      setButtonDisabled(false);
    }

    resetFields();
  }, [isOpen]);

  function onChangeNameHandler(e) {
    setNameInput(e.target.value);
    setFormErrors({
      ...formErrors,
      name: !e.target.validity.valid,
    });
  }

  function onChangeImageHandler(e) {
    setImageUrlInput(e.target.value);
    setFormErrors({
      ...formErrors,
      image: !e.target.validity.valid,
    });
  }

  function onChangeWeatherTypeHandler(e) {
    setWeatherTypeInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formErrors.name && !formErrors.image) {
      onAddItem({
        _id:
          currentClothingItems.length > 0
            ? currentClothingItems.at(-1)._id + 1
            : 0,
        name: nameInput,
        weather: weatherTypeInput,
        imageUrl: imageUrlInput,
      }).then(closeModal);
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
        onClose={closeModal}
        buttonText={buttonText}
        onSubmit={handleSubmit}
        isButtonDisabled={buttonDisabled}
      >
        <FormInput
          id="garmentName"
          type="text"
          label="Name"
          value={nameInput}
          minLength={2}
          maxLength={20}
          onChange={onChangeNameHandler}
          required={true}
        />

        <FormInput
          id="garmentImageURL"
          type="url"
          label="Image"
          value={imageUrlInput}
          onChange={onChangeImageHandler}
          required={true}
        />

        <FormRadioGroup
          name="weather"
          label="Select the weather type:"
          options={weatherOptions}
          selectedValue={weatherTypeInput}
          onChange={onChangeWeatherTypeHandler}
        />
      </ModalWithForm>
    )
  );
}

export default AddItemModal;
