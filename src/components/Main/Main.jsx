import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';

function Main() {
  return (
    <main className="main">
      <WeatherCard temp="30" weather="sunny" />
    </main>
  );
}

export default Main;
