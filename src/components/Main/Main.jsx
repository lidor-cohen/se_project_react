import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import { defaultClothingItems } from '../../utils/constants';
import ItemModal from '../ItemModal/ItemModal';
import { useState } from 'react';

function Main({ temp, weather }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalData, setModalData] = useState({});

  return (
    <main className="main">
      {modalOpened && (
        <ItemModal
          title={modalData.name}
          image={modalData.link}
          weatherCondition={modalData.weather}
          onClose={() => {
            setModalOpened(false);
          }}
        />
      )}
      <WeatherCard temp={temp} weather={weather} />
      <h2 className="main__header">
        Today is {temp}°C / You may want to wear:
      </h2>
      <div className="main__products">
        {defaultClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            image={item.link}
            title={item.name}
            handleCardClick={() => {
              setModalOpened(true);
              setModalData(item);
            }}
          />
        ))}
      </div>
    </main>
  );
}

export default Main;
