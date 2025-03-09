import './WeatherCard.css';

function WeatherCard(props) {
  const baseBackroundURL = `../../assets/weathercard-day/${props.weather}.png`;

  return (
    <div
      className="weather-card"
      style={{
        backgroundImage: `url(${
          new URL(baseBackroundURL, import.meta.url).href
        })`,
      }}
    >
      <h2 className="weather-card__temp">{props.temp}°C</h2>
    </div>
  );
}

export default WeatherCard;
