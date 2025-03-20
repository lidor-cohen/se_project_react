import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import { defaultClothingItems } from '../../utils/constants';
import { useContext } from 'react';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { CurrentWeatherDataContext } from '../../contexts/CurrentWeatherDataContext';

function Main({ handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { currentWeatherData } = useContext(CurrentWeatherDataContext);

  const filteredClothingItems = defaultClothingItems.filter(
    (item) => item.weather === currentWeatherData.feeling
  );

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
