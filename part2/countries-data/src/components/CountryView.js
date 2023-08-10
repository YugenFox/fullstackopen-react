import { useState } from "react";
import CountryData from "./CountryData";

const CountryView = ({ country }) => {
  const [showCountryView, setShowCountryView] = useState(false);
  const toggleView = () => {
    setShowCountryView(!showCountryView);
    console.log("clicked Toggle", !showCountryView);
  };

  return (
    <>
      {showCountryView ? (
        <CountryData
          country={country}
          showCountryView={showCountryView}
          toggleView={toggleView}
        />
      ) : (
        <p key={country.cca3}>
          {country.name.common}{" "}
          <button onClick={() => toggleView()}>
            {showCountryView ? "hide" : "show"}
          </button>
          {/* {showCountryView ? <CountryView country={country} /> : ""} */}
        </p>
      )}
    </>
  );
};
export default CountryView;
