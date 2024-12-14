const express = require('express')
const app = express()
require('dotenv').config()
const Person = require('./models/person')

const morgan = require('morgan')

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.static('dist'))
//   app.use(requestLogger)
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Invalid id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

app.get('/api/persons', (request, response) => {
  Person.find({}).then((Person) => {
    response.json(Person)
  })
})

app.get('/api/info', (request, response) => {
  const date = new Date().toString()
  Person.find({}).then((persons) => {
    response.send(`<p>Phone book has ${persons.length} entries</p><br>${date}`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response,next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        response.json(result)
      } else {
        response.json({ error: 'Not able to delete' })
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons/', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Invalid request: name and number are required',
    })
  }

  Person.findOne({ name: body.name })
    .then((nameExists) => {
      if (nameExists) {
        return response.status(400).json({
          error: 'Name already exists in phonebook',
        })
      }
      return Person.findOne({ number: body.number })
    })
    .then((numberExists) => {
      if (numberExists) {
        return response.status(400).json({
          error: 'Number already exists in phonebook',
        })
      }

      const person = new Person({
        name: body.name,
        number: body.number,
      })

      return person.save()
    })
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => {
      next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.use(unknownEndpoint)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`)
})
