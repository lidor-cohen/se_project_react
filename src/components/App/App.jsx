// External
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Components
import Header from '../Layout/Header/Header.jsx';
import Main from '../Layout/Main/Main.jsx';
import Footer from '../Layout/Footer/Footer.jsx';
import Profile from '../Layout/Profile/Profile.jsx';
import ModalContainer from '../Modal/Container/ModalContainer.jsx';

// Hooks
import { useWeather } from '../../hooks/useWeather.js';
import { useClothingItems } from '../../hooks/useClothingItems.js';
import { useModalState } from '../../hooks/useModalState.js';

// Context Provider
import AppContextProvider from '../../contexts/AppContextProvider.jsx';

function App() {
  // Hooks
  const { currentWeatherData } = useWeather();
  const { currentClothingItems, handleDeleteItem, handleAddItemSubmit } =
    useClothingItems();
  const {
    activeModal,
    modalData,
    selectedItemId,
    openModal,
    closeModal,
    setModalData,
    setSelectedItemId,
  } = useModalState();

  // Takes the card data, sets the relevant modal data,
  // also sents the currently selected item id and then
  // sets the active modal as the item modal
  // item object: { id, name, imageUrl }
  function handleCardClick(item) {
    setModalData(item);
    openModal('item-modal');
    setSelectedItemId(item._id);
  }

  if (!currentWeatherData) return <div>loading..</div>;

  return (
    <div className="page">
      <AppContextProvider
        currentClothingItems={currentClothingItems}
        currentWeatherData={currentWeatherData}
      >
        <ModalContainer
          openModal={openModal}
          closeModal={closeModal}
          activeModal={activeModal}
          modalData={modalData}
          selectedItemId={selectedItemId}
          onAddItem={() => handleAddItemSubmit(selectedItemId)}
          onDeleteItem={handleDeleteItem}
        />

        <div className="page__content">
          <Header
            openModal={openModal}
            cityName={currentWeatherData.cityName}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  handleCardClick={handleCardClick}
                  currentWeatherData={currentWeatherData}
                  currentClothingItems={currentClothingItems}
                />
              }
            />

            <Route
              path="/profile"
              element={<Profile handleCardClick={handleCardClick} />}
            />
          </Routes>

          <Footer />
        </div>
      </AppContextProvider>
    </div>
  );
}

export default App;
