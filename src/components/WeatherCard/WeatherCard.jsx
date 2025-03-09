import './WeatherCard.css';

function WeatherCard() {
  const background = '../../assets/weathercard-day/sunny.png';

  return (
    <div
      className="weather-card"
      style={{
        backgroundImage: `url(${new URL(background, import.meta.url).href})`,
      }}
    >
      <h2 className="weather-card__temp">24°C</h2>
    </div>
  );
}

export default WeatherCard;
