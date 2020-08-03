require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { response } = require('express')

const Person = require('./models/person')

const app = express()
app.use(bodyParser.json())
app.use(express.json())


app.get('/info', (req, res) => {
  const data = Person.find({}).then(person => {
    res.send(`Phonebook has info for  ${person.length} people`)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    res.json(person)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person =>{
    if (person){
      res.json(person)
    } else{
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res,next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(person => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', async (req,res, next) => {
  
  const body = req.body
  const data = await Person.find({}).then(p => p)
  
  let person = new Person({
    name: body.name,
    number: body.number   
  })

  let find = data.find(p => p.name === body.name)

  if (find) {
    let update = {
      name: body.name,
      number: body.number   
    }

    Person.findByIdAndUpdate(find.id, update, {new:true})
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))

  } else {
    person.save().then(saved => {
      res.json(saved)
    })
    .catch(error => next(error))
  }
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name : body.name,
    number : body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, {new:true})
    .then(updated => updated.toJSON())
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001 || process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})