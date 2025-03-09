import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import { fetchData } from '../../utils/weatherApi';
import { useEffect, useState } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    fetchData().then((res) => setWeatherData(res));
  }, []);

  if (!weatherData) return <></>;

  return (
    <div className="page">
      <Header cityName={weatherData.cityName} />
      <Main temp={weatherData.temp} weather={weatherData.weather} />
      <Footer />
    </div>
  );
}

export default App;
