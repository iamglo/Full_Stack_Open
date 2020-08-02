const express = require('express')
const { response } = require('express')
const app = express()

data = {
  "persons":[
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]
}

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for  ${data.persons.length} people`)
})

app.get('/api/persons', (req, res) => {
  res.json(data.persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const filt = data.persons.filter(d => d.id === id)

  if (!filt){
    res.status(404).end()
  } else {
    res.json(filt)
  }
})

app.delete('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)
  data.persons = data.persons.filter(d => d.id !== id)
  res.status(400).end()
})

app.post('/api/persons', (req,res) => {
  
  const person = req.body
  console.log(req.body)
  if (!person.name || ! person.number || person.name === "" || person.number === ""){
    res.status(400).json({ 
      error: 'content missing' 
    })
  }
  else if (data.persons.find(person.name)){
    res.status(400).json({ 
      error: 'duplicate number' 
    })
  }

  person.id = int(Math.random() * 1000) 
  data.person = data.person.concat(person)
  response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})