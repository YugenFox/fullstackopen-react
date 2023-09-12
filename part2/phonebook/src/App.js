import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import AddPerson from "./components/AddPerson";
import Numbers from "./components/Numbers";

//handles our axios stuff to talk to json server
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "040-123456", id: 1 },
  //   { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  //   { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  //   { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  // ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterPersons, setFilterPersons] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationIsError, setNotificationIsError] = useState(false)

  //set initial persons State with db.json using json-server
  useEffect(() => {
    console.log("effect");
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   console.log("promise fulfilled");
    //   console.log(response);
    //   setPersons(response.data);
    // });
    personService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      console.log(initialPersons);
      setPersons(initialPersons);
    });
  }, []);

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
      importance: true,
    };
    // check if name/number already exists in persons
    //has popup asking if they want to update the exiting name they input with a new number
    const nameExists = persons.some((person) => person.name === newName);
    if (nameExists) {
      if (
        window.confirm(
          `${nameEntry.name} already exists, update their number with a new one?`
        )
      ) {
        const sameName = persons.find(
          (person) => person.name === nameEntry.name
        );
        const sameNameNewNumber = { ...sameName, number: nameEntry.number };
        console.log(sameName, "same name");

        personService
          .update(sameName.id, sameNameNewNumber)
          .then((changedName) => {
            setPersons(
              persons.map((person) =>
                person.id === changedName.id ? changedName : person
              )
            );
          })
          .catch((error) => {
            console.log(`issue adding sameName`);
            setNotificationMessage(
              `Name ${nameEntry.name}'s information has already been removed from the server. Please refresh the page to add them as a new entry`
            );
            setNotificationIsError(true)
            setTimeout(() => {
              setNotificationMessage(null);
              setNotificationIsError(false)
            }, 5000);
            // return and tell them to try again(create new person from scratch), since are not updating a person still in the system as they suspected
            // clearForm() setNotMess to null
          });

        setNotificationMessage(
          `Name ${nameEntry.name}'s number was updated to ${nameEntry.number}`
        );
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      }
      clearForm();
      return;
    }
    //Checks if number already exists in persons
    // const numberExists = persons.some((person) => person.number === newNumber);
    // if (numberExists) {
    //   alert(`Number ${newNumber} already exists, exiting`);
    //   clearForm();
    //   return;
    // }

    personService.create(nameEntry).then((returnedNote) => {
      setPersons(persons.concat(returnedNote));
      clearForm();
      setNotificationMessage(`Name ${nameEntry.name} was added to the server`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    });

    //show full form on button click
    // console.log("e.target", event.target)
    //the first element is the input so it would show what the value= in there
    // console.log('button clicked', event.target.elements[0].value)
  };

  const removePerson = (id, name) => () => {
    if (window.confirm(`Do you want to delete ${name}`)) {
      console.log(`try removing ${name}`);
      personService
        .remove(id)
        .then((removedPerson) => {
          console.log(`Removed ${name}`);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(`already removed user ${name} from server`);
        });
    }
  };

  const toggleImportanceOf = (id) => () => {
    console.log(`The id of ${id} needs to be toggled`);
    const person = persons.find((person) => person.id === id);
    console.log("personToggled", person);
    const updatedPerson = { ...person, importance: !person.importance };
    console.log("updPerson", updatedPerson);

    personService.update(id, updatedPerson).then((changedPerson) => {
      setPersons(
        persons.map((person) => (person.id === id ? changedPerson : person))
      );
    });

    // personService.update(id, updatedPerson).then(response =>{
    //   console.log(`id ${id} updPerson: ${updatedPerson}`)
    // })
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
      <Notification text={notificationMessage} isErrorMessage={notificationIsError}/>

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
      <Numbers
        shownPeople={shownPeople}
        toggleImportance={toggleImportanceOf}
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
