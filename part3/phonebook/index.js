const express = require("express");
const app = express();

app.use(express.json()); //lets us use POST

let phonebook = [
  [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456",
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523",
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345",
    },
    {
      id: 4,
      name: "Mary Poppendieck",
      number: "39-23-6423122",
    },
  ],
];
let currentDate = new Date();

//routing for webpages and what to call
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons/", (request, response) => {
  response.json(phonebook);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id); //convert id to a number
  const personArray = phonebook[0]; //get inner array of persons
  const person = personArray.find((p) => p.id === id); //find person with that id

  if (person) {
    console.log("this person found")
    response.json(person);
  } else {
    console.log(`Person with id ${id} not found`)
    response.status(404).end()
  }
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${phonebook[0].length} people</p>
  <p>${currentDate}</p>
  `
  );
});

//deleting
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  phonebook[0] = phonebook[0].filter((p) => p.id !== id)

  response.status(204).end()
})

//post / adding
app.post("/api/persons/", (request, response) => {
  const body = request.body
  console.log(body, "body")
  const id = Math.floor(Math.random() * (10000))

  //must have name & number or return error
  if(!body.name || !body.number){
    return response.status(400).json({error: "Name and number are required"})
  }
  //check if person with same name already exists
  const nameExists = phonebook[0].some((person) => person.name === body.name)
  if(nameExists){
    return response.status(400).json({error: "Name already exist in phonebook"})
  }

  // const name = "Tyler Chesty"
  // const number = "999-999-9999"

  // const person = {
  //   id: id,
  //   name: name,
  //   number: number
  // }
  const person = {
    id: id,
    name: body.name,
    number: body.number
  }
  //add new person to phonebook

  phonebook[0].push(person)
  
  //render on screen new person
  response.json(person)
})

//setting port for local host
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
