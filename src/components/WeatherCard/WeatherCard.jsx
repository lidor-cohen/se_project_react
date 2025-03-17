import './WeatherCard.css';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { useContext } from 'react';

function WeatherCard(props) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentHour = new Date().getHours();
  const isDayTime = currentHour > 6 && currentHour < 20;

  const baseBackroundURL = `../../assets/weathercard-${
    isDayTime ? 'day' : 'night'
  }/${props.weather}.png`;

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
        {props.temp}°{currentTemperatureUnit}
      </h2>
    </div>
  );
}

export default WeatherCard;
