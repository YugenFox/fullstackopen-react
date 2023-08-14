import axios from "axios";
// const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = (latitude, longitude) => {
  const request = axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto&forecast_days=1`);
  return request.then((response) => {
    return response.data;
  });
};

export default { getAll };
