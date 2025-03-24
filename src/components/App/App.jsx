// External
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import WeatherAPI from '../../utils/WeatherAPI.js';
import dbApi from '../../utils/dbApi.js';

// Components
import './App.css';
import Header from '../Layout/Header/Header.jsx';
import Main from '../Layout/Main/Main.jsx';
import Footer from '../Layout/Footer/Footer.jsx';
import ItemModal from '../Modals/ItemModal/ItemModal';
import Profile from '../Layout/Profile/Profile.jsx';
import AddItemModal from '../Modals/AddItemModal/AddItemModal.jsx';

// Contexts
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { CurrentWeatherDataContext } from '../../contexts/CurrentWeatherDataContext.js';
import { CurrentClothingItemsContext } from '../../contexts/CurrentClothingItemsContext.js';

function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState('');
  const [modalData, setModalData] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [currentClothingItems, setCurrentClothingItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(-1);

  // Toggle switch global context
  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((prev) =>
      prev === 'F' ? (prev = 'C') : (prev = 'F')
    );
  }

  // Takes the card data, sets the relevant modal data,
  // also sents the currently selected item id and then
  // sets the active modal as the item modal
  function handleCardClick(item) {
    setSelectedItemId(item._id);
    setActiveModal('item-modal');
  }

  // Handle opening the add garment modal
  function openAddGarmentModal() {
    setActiveModal('add-garment');
  }

  // Sets the active
  function closeOpenModal() {
    setActiveModal('');
  }

  // Calls the items api with the createItem function.
  // function takes an item object and returns a promise.
  function handleAddItemSubmit(item) {
    return dbApi
      .createItem(item)
      .then((res) => {
        if (res.ok) {
          setCurrentClothingItems([item, ...currentClothingItems]);
          return Promise.resolve();
        }
        return Promise.reject(`Error: ${res.statusText}`);
      })
      .catch(console.error);
  }

  // Calls the items api with the deleteItem function.
  // function takes an item id and returns a promise.
  function handleDeleteItem(id) {
    dbApi
      .deleteItem({ id })
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

  // On app mount
  useEffect(() => {
    // Call the items api to get all of the items and
    // set the global context state variable to this list.
    // then, reverse this list so it will display the last item
    // first (Newest added item will be displayed first).
    dbApi
      .getItems()
      .then((res) => res.json())
      .then((arr) => {
        setCurrentClothingItems(arr.reverse());
      });

    // Call the weather api to get the current weather as
    // an object containing:
    // {
    //    cityName,
    //    temp: {
    //      tempC,
    //      tempF
    //    },
    //    feeling (cold, hot, warm),
    //    weather (sunny, cloudy, rainy, etc...)
    // }
    WeatherAPI.fetchData()
      .then((res) => setCurrentWeatherData(res))
      .catch(console.error);
  }, []);

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

            <ItemModal
              isOpen={activeModal === 'item-modal'}
              title={modalData.name}
              image={modalData.imageUrl}
              weatherCondition={modalData.weather}
              onClose={() => {
                setActiveModal('');
              }}
              onDelete={handleDeleteItem}
            />

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
                        handleCardClick(data);
                      }}
                      handleAddCard={handleModalOpen}
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
