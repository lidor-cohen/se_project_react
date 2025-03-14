import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import { defaultClothingItems } from '../../utils/constants';

function Main({ temp, weather, feeling, handleCardClick }) {
  const filteredClothingItems = defaultClothingItems.filter(
    (item) => item.weather === feeling
  );

  return (
    <main className="main">
      <WeatherCard temp={temp} weather={weather} />
      <h2 className="main__header">
        Today is {temp}°C / You may want to wear:
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
