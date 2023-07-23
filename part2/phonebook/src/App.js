import { useState } from "react";
import SearchFilter from "./components/SearchFilter";
import AddPerson from "./components/AddPerson";
import Numbers from "./components/Numbers";

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

  const addName = (event) => {
    event.preventDefault();

    const clearForm = () => {
      setNewName("");
      setNewNumber("");
      setFilterPersons("");
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
    setFilterPersons(e.target.value);
  };

  const shownPeople = persons.filter((person) =>
    person.name.toLowerCase().startsWith(filterPersons)
  );

  return (
    <div>
      <h1>Phonebook</h1>

      <SearchFilter
        filterPersons={filterPersons}
        handleFilterPersons={handleFilterPersons}
      />
      <AddPerson
        addName={addName}
        newName={newName}
        updateName={updateName}
        newNumber={newNumber}
        updateNumber={updateNumber}
      />
      <Numbers shownPeople={shownPeople} />
    </div>
  );
};

export default App;
