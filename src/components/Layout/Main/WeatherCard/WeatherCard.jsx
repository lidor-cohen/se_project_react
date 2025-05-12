// External
import './WeatherCard.css';
import { useContext } from 'react';

// Contexts
import { CurrentTemperatureUnitContext } from '../../../../contexts/CurrentTemperatureUnitContext';

function WeatherCard({ temp, weather }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentHour = new Date().getHours();
  const isDayTime = currentHour > 6 && currentHour < 20;

  const baseBackroundURL = `/assets/weathercard-${
    isDayTime ? 'day' : 'night'
  }/${weather}.png`;

  return (
    <div
      className="weather-card"
      style={{
        backgroundImage: `url(${
          new URL(baseBackroundURL, import.meta.url).href
        })`,
      }}
    >
      <h2 className="weather-card__temp">
        {temp}°{currentTemperatureUnit}
      </h2>
    </div>
  );
}

export default WeatherCard;
