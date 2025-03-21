import {
  longitude as lon,
  latitude as lat,
  weatherApiKey as apiKey,
} from './constants';

class WeatherAPI {
  constructor() {
    this.baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  }

  fetchData() {
    return fetch(this.baseURL)
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(`Error: ${res.status}`);
      })
      .then((json) => {
        const temp = json.main.temp;

        let feeling;
        if (temp >= 80) {
          feeling = 'hot';
        } else if (temp >= 65) {
          feeling = 'warm';
        } else {
          feeling = 'cold';
        }

        const weatherID = json.weather[0].id;
        let weather;
        if (weatherID === 800) weather = 'sunny';
        else if (weatherID > 800) weather = 'cloudy';
        else if (weatherID >= 200 && weatherID < 300) weather = 'storm';
        else if (weatherID >= 300 && weatherID < 600) weather = 'rain';
        else if (weatherID >= 600 && weatherID < 700) weather = 'snow';
        else if (weatherID >= 700 && weatherID < 800) weather = 'fog';

        return {
          cityName: json.name,
          temp: { F: temp, C: Math.round(((temp - 32) * 5) / 9) },
          feeling,
          weather,
        };
      });
  }
}

export default new WeatherAPI();
