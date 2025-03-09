import { longitude as lon, latitude as lat, apiKey } from './constants';

const baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
function fetchData() {
  return fetch(baseURL)
    .then((res) => res.json())
    .then((json) => {
      const temp = json.main.temp;
      let feeling;

      if (temp >= 30) {
        feeling = 'hot';
      } else if (temp >= 25) {
        feeling = 'warm';
      } else {
        feeling = 'cold';
      }

      return {
        cityName: json.name,
        temp,
        feeling,
      };
    })
    .catch((err) => err);
}

export { fetchData };
