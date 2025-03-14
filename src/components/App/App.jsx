import { fetchData } from '../../utils/weatherApi';
import { useEffect, useState } from 'react';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState('');
  const [modalData, setModalData] = useState({});
  const [apiError, setApiError] = useState('');

  function handleCardClick() {
    setActiveModal('item-modal');
  }

  function handleModalOpen() {
    setActiveModal('add-garment');
  }

  function handleModalClose() {
    setActiveModal('');
  }

  useEffect(() => {
    fetchData()
      .then((res) => setWeatherData(res))
      .catch((err) => {
        setApiError(err);
      });
  }, []);

  if (!weatherData) return <div>{apiError}</div>;

  // I decided to take a different approach than the video
  // because the guy in the video is overcomplicating it by
  // passing too many values down the components when all can
  // be managed from the App.jsx component.
  // If the approach of the guy in the video is better I would
  // love an explanation.

  // THANKS!!
  return (
    <div className="page">
      {activeModal === 'add-garment' && (
        <ModalWithForm
          title="Add garment"
          name="garment"
          onClose={handleModalClose}
          buttonText="Add garment"
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
        </ModalWithForm>
      )}

      {activeModal === 'item-modal' && (
        <ItemModal
          title={modalData.name}
          image={modalData.link}
          weatherCondition={modalData.weather}
          onClose={() => {
            setActiveModal('');
          }}
        />
      )}

      <div className="page__content">
        <Header
          cityName={weatherData.cityName}
          handleButtonOpen={handleModalOpen}
        />
        <Main
          temp={weatherData.temp}
          weather={weatherData.weather}
          feeling={weatherData.feeling}
          handleCardClick={(data) => {
            setModalData(data);
            handleCardClick();
          }}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
