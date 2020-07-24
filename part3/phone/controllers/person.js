const personRouter = require('express').Router()
const Person = require('../models/person')

personRouter.get('/api/persons', (request, response, next) => {
    Person.find({}).then(person => {
        if (person){
            response.json(person)
        } else {
            console.log(person)
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

personRouter.get('/info', (req, response) => {
    Person.find({}).then(l => {
        response.send(`<div>phonebook has info for ${l.length} people </div> <br></br> ${Date()}`)
    })
})

personRouter.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person =>{
        response.json(person)
    })
})

personRouter.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personRouter.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
      name: body.name,
      number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(up => {
        response.json(up)
      })
      .catch(error => next(error))
    })

personRouter.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person
    .save()
    .then(s => s.toJSON())
    .then(sf => {
        response.json(sf)
    })
    .catch(error => next(error))
})

module.exports = personRouter