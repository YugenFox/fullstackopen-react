import CountryView from "./CountryView";
import CountryData from "./CountryData";

const CountryList = ({ countries }) => {
  //handled in App.js
  if (countries.length === 1) {
    return <CountryData country={countries[0]} />;
  }

  return (
    <div>
      {countries.map((country) => (
        <CountryView country={country} />
      ))}
    </div>
  );
};
export default CountryList;
