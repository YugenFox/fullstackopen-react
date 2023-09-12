const express = require("express");
const morgan = require("morgan")
const app = express();
const cors = require("cors")

app.use(express.json())
// Use the 'tiny' format for most requests
app.use(morgan('tiny'));
//lets backend and frontend interact from different origins
app.use(cors())
/* 
whenever express gets an HTTP GET request it will first check if the 'build' directory contains a file corresponding to the request's address. If a correct file is found, express will return it.

Now HTTP GET requests to the address www.serversaddress.com/index.html or www.serversaddress.com will show the React frontend. GET requests to the address www.serversaddress.com/api/notes will be handled by the backend's code.
*/
app.use(express.static('build'))

// Create a custom token for logging request body for POST requests
morgan.token('post-data', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});

// Use the custom token for POST requests
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :post-data', {
    skip: (req) => req.method !== 'POST',
  })
);

const currentDate = new Date()

let phonebook = [
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
];

//GET
app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${phonebook.length} people</p>
  <p>${currentDate}</p>`);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = phonebook.find((p)=> p.id === id)

  if(person){
    console.log(`Person with id ${id} found`)
    res.json(person)
  }else{
    console.log(`Person with id ${id} not found`)
    res.status(404).end()
  }
})

//DELETE
app.delete("/api/persons/:id", (req, res)=> {
  const id = Number(req.params.id)
  phonebook = phonebook.filter((p) => p.id !== id)

  res.status(204).end()
})

//POST
app.post("/api/persons", (req, res) => {
  const body = req.body
  //name & number is present check
  if(!body.name || !body.number){
    return res.send({error: `both name & number must be filled out`})
  }
  //name does not already exist check
  const nameExists = phonebook.some((p)=> p.name === body.name)
  if(nameExists){
    return res.send({error: `name already exists in phonebook`})
  }

  const id = Math.floor(Math.random() * 10000)
  const person = {
    id: id,
    name: body.name,
    number: body.number
  }
  console.log(person, "new person added")
  phonebook.push(person)
  res.json(person)
})

//port to listen to
// const PORT = 3001;
const PORT = process.env.PORT || 3001 //is what fly.io or Render needs 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
