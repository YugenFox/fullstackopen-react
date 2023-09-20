//Connecting the backend to a database
const mongoose = require('mongoose')

//don't save url with psw to github, use .env file
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(_result => {
    console.log(`connected to MongoDB`)
  })
  .catch((error) => {
    console.log(`error connecting to mongoDB:`, error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => {
        return /^\d{2,3}-\d{7}$/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number format of xx-xxxxxxx or xxx-xxxxxxx`
    },
    required: [true, `User phone number required`] //message displays if number missing since is required
  },
  important: Boolean,
});

//changes the object sent back from the server
personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// const Person = mongoose.model("Person", personSchema);

module.exports = mongoose.model('Person', personSchema)