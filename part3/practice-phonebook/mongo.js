const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
console.log(`len: ${process.argv.length} name: ${name} number: ${number}`);

const url = `mongodb+srv://fullstack:${password}@cluster0.zlotlaj.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  important: Boolean,
});

const Person = mongoose.model("Person", personSchema);

//Reading from mongoDB

//node mongo.js yourpassword Anna 040-1234556 - length of 5
//added Anna number 040-1234556 to phonebook
//name must be wrapped in "" if spaces "Anna Lane"
//return info of new person added
if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    number: number,
    important: true,
  });

  person.save().then((result) => {
    console.log("person saved!");
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

//node mongo.js yourpassword - length of 3
/* 
  phonebook:
Anna 040-1234556
Arto Vihavainen 045-1232456
Ada Lovelace 040-1231236
  */
//return all entries in the phonebook
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("returning all persons");
    result.forEach((person) => {
      console.log(person);
    });
    console.log("finished printing person(s) data from phonebook");
    mongoose.connection.close();
  });
}

//Old static adding person without using process.argv parameters
//{"name":"d","number":"33","importance":true}
// const person = new Person({
//   name: 'John Rodney',
//   number: "040-1234556",
//   important: true,
// })

// Save new person
// person.save().then(result => {
//   console.log('person saved!')
//   mongoose.connection.close()
// })

//Find all persons
// Person.find({}).then(result => {
//   console.log("returning all persons")
//   result.forEach(person => {
//     console.log(person)
//   })
//   mongoose.connection.close()
// })
