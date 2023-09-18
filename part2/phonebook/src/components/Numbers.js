import Number from "./Number";

const Numbers = ({ shownPeople, toggleImportance, removePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {shownPeople.map((person, i) => (
        <Number
          key={person.name}
          name={person.name}
          number={person.number}
          importance={person.important}
          toggleImportance={toggleImportance}
          removePerson={removePerson}
          id={person.id}
        />
      ))}
    </div>
  );
};
export default Numbers;
