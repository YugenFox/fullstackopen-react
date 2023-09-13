//Connecting the backend to a database
const mongoose = require('mongoose')

//don't save url with psw to github, use .env file
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(result => {
    console.log(`connected to MongoDB`)
  })
  .catch((error) => {
    console.log(`error connecting to mongoDB:`, error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  important: Boolean,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// const Person = mongoose.model("Person", personSchema);

module.exports = mongoose.model('Person', personSchema)