// External
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchData } from '../../utils/weatherApi';

// Components
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import Profile from '../Profile/Profile';

// Contexts
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { CurrentWeatherDataContext } from '../../contexts/CurrentWeatherDataContext.js';

function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState('');
  const [modalData, setModalData] = useState({});
  const [apiError, setApiError] = useState('');
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((prev) =>
      prev === 'F' ? (prev = 'C') : (prev = 'F')
    );
  }

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
      .then((res) => setCurrentWeatherData(res))
      .catch((err) => {
        setApiError(err);
      });
  }, []);

  if (!currentWeatherData) return <div>{apiError}</div>;

  return (
    <div className="page">
      <CurrentWeatherDataContext.Provider value={{ currentWeatherData }}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
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
                  <label
                    htmlFor="hot-weather"
                    className="form-modal__label-radio"
                  >
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
                  <label
                    htmlFor="warm-weather"
                    className="form-modal__label-radio"
                  >
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
                  <label
                    htmlFor="cold-weather"
                    className="form-modal__label-radio"
                  >
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
              cityName={currentWeatherData.cityName}
              handleButtonOpen={handleModalOpen}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    handleCardClick={(data) => {
                      setModalData(data);
                      handleCardClick();
                    }}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <Profile
                    handleCardClick={(data) => {
                      setModalData(data);
                      handleCardClick();
                    }}
                  />
                }
              ></Route>
            </Routes>

            <Footer />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentWeatherDataContext.Provider>
    </div>
  );
}

export default App;
