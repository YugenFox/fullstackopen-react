import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import CountryList from "./components/CountryList";
import CountryView from "./components/CountryView";
import CountryData from "./components/CountryData";

import countriesService from "./services/countries";

function App() {
  const [search, setSearch] = useState("");
  //onChange function to change search's state
  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
  };
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  // get all country data
  useEffect(() => {
    countriesService
      .getAll()
      .then((data) => {
        setCountries(data); // Set the resolved data into the state
        console.log(`use effect countries data`, data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  // let filteredCountries = [];
  useEffect(() => {
    console.log(`effect run, search is now`, search);
    //skip if search is not defined
    if (search) {
      console.log("looking for search", search);

      let filterData = countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(filterData);
      console.log("filtered list", filterData);
    }
  }, [search]);

  //do a countryService.getAll()
  //filter conditions **
  //If there are too many (over 10) countries that match the search, then the user is prompted to make their search more specific: "Too many matches, specify another filter"
  //If there are ten or fewer countries, but more than one, then all countries matching the search are shown:
  //When there is only one country matching the search, then the basic data of the country (eg. capital and area), its flag and the languages spoken are shown:
  let content;

  if (filteredCountries.length > 10) {
    content = <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length > 1) {
    // content = <CountryList countries={filteredCountries} />;
    content = <CountryList countries={filteredCountries} />;
  } else if (filteredCountries.length === 1) {
    // const country = filteredCountries[0];
    // content = <CountryData country={country} />;
    content = <CountryList countries={filteredCountries} />;
  } else {
    content = <div>No matching countries found {filteredCountries}</div>;
  }

  return (
    <div>
      <form>
        <label>find countries</label>
        <input
          value={search}
          type="text"
          onChange={handleSearch}
          placeholder="search for country data"
        ></input>
      </form>
      {content}
    </div>
  );
}

export default App;
