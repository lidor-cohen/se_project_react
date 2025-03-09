import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import { defaultClothingItems } from '../../utils/constants';

function Main({ temp }) {
  return (
    <main className="main">
      <WeatherCard temp={temp} weather="sunny" />
      <h2 className="main__header">
        Today is {temp}°C / You may want to wear:
      </h2>
      <div className="main__products">
        {defaultClothingItems.map((item) => (
          <ItemCard image={item.link} title={item.name} />
        ))}
      </div>
    </main>
  );
}

export default Main;
