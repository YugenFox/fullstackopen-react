import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterPersons, setFilterPersons] = useState("");
  const [shownPersons, setShownPersons] = useState(persons)

  const addName = (event) => {
    event.preventDefault();

    const clearForm = () => {
      setNewName("");
      setNewNumber("");
    };

    const nameEntry = {
      name: newName,
      number: newNumber,
    };
    // check if name already exists in persons
    const nameExists = persons.some((person) => person.name === newName);
    if (nameExists) {
      alert(`${newName} already exists, exiting`);
      clearForm();
      return;
    }
    const numberExists = persons.some((person) => person.number === newNumber);
    if (numberExists) {
      alert(`Number ${newNumber} already exists, exiting`);
      clearForm();
      return;
    }

    setPersons(persons.concat(nameEntry));
    clearForm();
    //show full form on button click
    // console.log("e.target", event.target)
    //the first element is the input so it would show what the value= in there
    // console.log('button clicked', event.target.elements[0].value)
  };

  const updateName = (event) => {
    // console.log(event.target.value, "-set name")
    setNewName(event.target.value);
  };
  const updateNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterPersons = (e) => {
    const filter = e.target.value;
    setFilterPersons(e.target.value);
    //not blank
    if (filter !== "") {
      const filteredPersons =persons.filter((person)=> person.name.toLowerCase() === filter.toLowerCase())
      setShownPersons(filteredPersons)
    }else{
      setShownPersons(persons)
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown people{" "}
      <input
        value={filterPersons}
        onChange={handleFilterPersons}
        placeholder="search for person"
      />
      <h2>add new person</h2>
      <form onSubmit={addName}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={updateName}
            placeholder="Enter name"
          />
        </div>
        <div>
          number: <input value={newNumber} onChange={updateNumber} placeholder="enter number"/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {shownPersons.map((person, i) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
