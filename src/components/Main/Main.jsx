import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import { defaultClothingItems } from '../../utils/constants';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { useContext } from 'react';

function Main({ temp, weather, feeling, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredClothingItems = defaultClothingItems.filter(
    (item) => item.weather === feeling
  );

  return (
    <main className="main">
      <WeatherCard temp={temp[currentTemperatureUnit]} weather={weather} />
      <h2 className="main__header">
        Today is {temp[currentTemperatureUnit]}°{currentTemperatureUnit} / You
        may want to wear:
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
