// External
import './Main.css';
import { useState, useContext, useEffect } from 'react';

// Components
import WeatherCard from './WeatherCard/WeatherCard';
import ItemCard from '../../Cards/ItemCard/ItemCard';

// Contexts
import { CurrentTemperatureUnitContext } from '../../../contexts/CurrentTemperatureUnitContext';

function Main({ handleCardClick, currentWeatherData, currentClothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const [filteredClothingItems, setFilteredClothingItems] = useState([]);

  useEffect(() => {
    setFilteredClothingItems(
      currentClothingItems.filter(
        (item) => item.weather === currentWeatherData.feeling
      )
    );
  }, [currentClothingItems]);

  return (
    <main className="main">
      <WeatherCard
        temp={currentWeatherData.temp[currentTemperatureUnit]}
        weather={currentWeatherData.weather}
      />
      <h2 className="main__header">
        Today is {currentWeatherData.temp[currentTemperatureUnit]}°
        {currentTemperatureUnit} / You may want to wear:
      </h2>
      <div className="main__products">
        {filteredClothingItems
          .map((item) => (
            <ItemCard
              key={item._id}
              id={item._id}
              name={item.name}
              imageUrl={item.imageUrl}
              handleCardClick={() => handleCardClick(item)}
            />
          ))
          .reverse()}
      </div>
    </main>
  );
}

export default Main;
