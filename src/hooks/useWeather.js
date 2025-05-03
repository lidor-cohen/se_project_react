import { useEffect, useState } from 'react';

// Api
import weatherApi from '../utils/apis/weatherApi';

export function useWeather() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);

  useEffect(() => {
    // Call the weather api to get the current weather as
    // an object containing:
    // {
    //    cityName,
    //    temp: {
    //      tempC,
    //      tempF
    //    },
    //    feeling (cold, hot, warm),
    //    weather (sunny, cloudy, rainy, etc...)
    // }
    weatherApi
      .fetchData()
      .then((res) => setCurrentWeatherData(res))
      .catch(console.error);
  }, []);

  return { currentWeatherData };
}
