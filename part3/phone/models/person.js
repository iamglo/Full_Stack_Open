const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

// mongoose.set('useFindAndModify', false)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        required: true
    },
    number: {
        type: String,
        minlength: 7,
        required: true
    }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)