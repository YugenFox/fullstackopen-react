const CountryData = ({ country, showCountryView, toggleView }) => {
  // Extract the language values from the object and join them
  const languages = Object.values(country.languages).join(", ");

  return (
    <div>
      <h2>
        {country.name.common}{" "}
        <button onClick={toggleView}>
          {showCountryView ? "hide" : "show"}
        </button>
      </h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>Languages: {languages}</p>
      <img src={country.flags.svg} alt={`${country.name} flag`} />
    </div>
  );
};
export default CountryData;
