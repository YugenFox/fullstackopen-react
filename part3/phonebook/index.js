const express = require("express");
const app = express();

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

//setting port for local host
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
