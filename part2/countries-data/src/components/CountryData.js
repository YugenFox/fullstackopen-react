import { useEffect, useState } from "react";
import "./CountryData.css";
import weatherServices from "../services/weather";

const CountryData = ({ country, weatherData, showCountryView, toggleView }) => {
  // const [weatherData, setWeatherData] = useState([]);
  // //weather data from open-meteo.com
  // useEffect(() => {
  //   const latitude = country.latlng[0];
  //   const longitude = country.latlng[1];

  //   weatherServices
  //     .getAll(latitude, longitude)
  //     .then((data) => {
  //       setWeatherData(data);
  //       console.log(`use effect weather data`, data);
  //     })
  //     .catch((error) => {
  //       console.log(`Error fetching weather data`, error);
  //     });
  // }, []);

  // Extract the language values from the object and join them
  const languages = Object.values(country.languages).join(", ");

  return (
    <div className="country-data">
      <h2>
        {country.name.common}{" "}
        {showCountryView && (
          <button onClick={toggleView}>
            {showCountryView ? "hide" : "show"}
          </button>
        )}
      </h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>Languages: {languages}</p>
      <img src={country.flags.svg} alt={`${country.name} flag`} />
      <h3>Weather in {country.capital}</h3>
      <p>Temperature: {weatherData.current_weather.temperature} Fahrenheit</p>
      <img placeholder="weather graphic" />
      <p>wind speed: {weatherData.current_weather.windspeed} Mph</p>
    </div>
  );
};
export default CountryData;
