import { useState, useEffect } from "react";
import CountryView from "./CountryView";
import CountryData from "./CountryData";

import weatherServices from "../services/weather";

const CountryList = ({ countries }) => {
  //weather data
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    // Fetch weather data for all countries
    const fetchWeatherData = async () => {
      const weatherDataMap = {};
      for (const country of countries) {
        const latitude = country.latlng[0];
        const longitude = country.latlng[1];

        try {
          const data = await weatherServices.getAll(latitude, longitude);
          //the name that the data will be stored in the weather object
          weatherDataMap[country.cca3] = data;
        } catch (error) {
          console.log(
            `Error fetching weather data for ${country.name.common}`,
            error
          );
        }
      }
      setWeatherData(weatherDataMap);
    };

    fetchWeatherData();
  }, [countries]);

  //was handled in App.js, but handled here so can use the weatherState made here
  if (countries.length === 1) {
    return (
      <CountryData
        country={countries[0]}
        weatherData={weatherData[countries[0].cca3] || null}
      />
    );
  }

  return (
    <div>
      {countries.map((country) => (
        <CountryView
          key={country.cca3}
          country={country}
          weatherData={weatherData[country.cca3]}
        />
      ))}
    </div>
  );
};
export default CountryList;
