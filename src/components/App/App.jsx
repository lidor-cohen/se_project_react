// External
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import WeatherAPI from '../../utils/WeatherAPI.js';
import dbApi from '../../utils/dbApi.js';

// Components
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ItemModal from '../ItemModal/ItemModal';
import Profile from '../Profile/Profile';
import AddItemModal from '../AddItemModal/AddItemModal.jsx';

// Contexts
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { CurrentWeatherDataContext } from '../../contexts/CurrentWeatherDataContext.js';
import { CurrentClothingItemsContext } from '../../contexts/CurrentClothingItemsContext.js';

function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState('');
  const [modalData, setModalData] = useState({});
  const [apiError, setApiError] = useState('');
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [currentClothingItems, setCurrentClothingItems] = useState([]);

  const [selectedItemId, setSelectedItemId] = useState(-1);

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((prev) =>
      prev === 'F' ? (prev = 'C') : (prev = 'F')
    );
  }

  function handleCardClick(item) {
    setSelectedItemId(item._id);
    setActiveModal('item-modal');
  }

  function handleModalOpen() {
    setActiveModal('add-garment');
  }

  function handleModalClose() {
    setActiveModal('');
  }

  function handleAddItemSubmit(item) {
    dbApi
      .createItem(item)
      .then((res) => {
        if (res.ok) {
          setCurrentClothingItems([item, ...currentClothingItems]);
          return Promise.resolve();
        }
        return Promise.reject(`Error: ${res.statusText}`);
      })
      .then.catch((err) => setApiError(err));
    handleModalClose();
  }

  function handleDeleteItem() {
    dbApi
      .deleteItem({ id: selectedItemId })
      .then((res) => {
        if (res.ok) {
          handleModalClose();
          dbApi
            .getItems()
            .then((res) => res.json())
            .then((arr) => {
              setCurrentClothingItems(arr.reverse());
            });
          return Promise.resolve();
        }
        return Promise.reject(`Error: ${res.statusText}`);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    dbApi
      .getItems()
      .then((res) => res.json())
      .then((arr) => {
        setCurrentClothingItems(arr.reverse());
      });

    WeatherAPI.fetchData()
      .then((res) => setCurrentWeatherData(res))
      .catch((err) => {
        setApiError(err);
      });
  }, []);

  if (!currentWeatherData) return <div>{apiError}</div>;

  return (
    <div className="page">
      <CurrentClothingItemsContext.Provider value={{ currentClothingItems }}>
        <CurrentWeatherDataContext.Provider value={{ currentWeatherData }}>
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <AddItemModal
              isOpen={activeModal === 'add-garment'}
              onAddItem={handleAddItemSubmit}
              onCloseModal={handleModalClose}
            />

            {activeModal === 'item-modal' && (
              <ItemModal
                title={modalData.name}
                image={modalData.imageUrl}
                weatherCondition={modalData.weather}
                onClose={() => {
                  setActiveModal('');
                }}
                onDelete={handleDeleteItem}
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
                        handleCardClick(data);
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
      </CurrentClothingItemsContext.Provider>
    </div>
  );
}

export default App;
