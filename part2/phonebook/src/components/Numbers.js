import Number from "./Number";

const Numbers = ({ shownPeople }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {shownPeople.map((person, i) => (
        <Number key={person.name} name={person.name} number={person.number} />
      ))}
    </div>
  );
};
export default Numbers;
