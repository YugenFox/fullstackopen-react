require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(express.json());
// Use the 'tiny' format for most requests
app.use(morgan("tiny"));
//lets backend and frontend interact from different origins
app.use(cors());
/* 
whenever express gets an HTTP GET request it will first check if the 'build' directory contains a file corresponding to the request's address. If a correct file is found, express will return it.

Now HTTP GET requests to the address www.serversaddress.com/index.html or www.serversaddress.com will show the React frontend. GET requests to the address www.serversaddress.com/api/notes will be handled by the backend's code.
*/
app.use(express.static("build"));

// Create a custom token for logging request body for POST requests
morgan.token("post-data", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

// Use the custom token for POST requests
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-data",
    {
      skip: (req) => req.method !== "POST",
    }
  )
);

//brings in mongoose Person model from modules folder, lets us connect to mongoDB data stored online
const Person = require("./models/person");

//GET with mongoDB
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  const currentDate = new Date();
  Person.find({}).then((persons) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${currentDate}</p>`);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//DELETE
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

//POST
app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log(body, "POST - req.body");
  console.log(body.content, "POST - req.body.content");

  // name & number is present check
  if (!body.name || !body.number) {
    return res.status(400).json({ error: `name or number is missing` });
  }

  // //name does not already exist check
  // const nameExists = phonebook.some((p)=> p.name === body.name)
  // if(nameExists){
  //   return res.send({error: `name already exists in phonebook`})
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
    console.log(person, "new person added");
  });
});

// PUT /Update
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

//handler of request with unknown endpoint
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

//handler of request with result of error(s)
const errorHandler = (error, req, res, next) => {
  console.log(error);

  if (error.name === "CastError") {
    return res.status(500).send({ error: "malformatted id" });
  }

  next(error);
};
app.use(errorHandler);

//port to listen to
// const PORT = 3001;
const PORT = process.env.PORT; //process.env.PORT is what fly.io or Render needs
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// let phonebook = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

//GET without mongoDB
// app.get("/api/persons", (req, res) => {
//   res.json(phonebook);
// });
