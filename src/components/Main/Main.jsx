import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';

import { useState, useContext, useEffect } from 'react';

import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { CurrentWeatherDataContext } from '../../contexts/CurrentWeatherDataContext';
import { CurrentClothingItemsContext } from '../../contexts/CurrentClothingItemsContext';

function Main({ handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { currentWeatherData } = useContext(CurrentWeatherDataContext);
  const { currentClothingItems } = useContext(CurrentClothingItemsContext);

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
        {filteredClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            image={item.link}
            title={item.name}
            handleCardClick={() => handleCardClick(item)}
          />
        ))}
      </div>
    </main>
  );
}

export default Main;
