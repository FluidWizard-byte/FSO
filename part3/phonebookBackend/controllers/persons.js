const personsRouter=require('express').Router()
const Person=require('../models/person')


personsRouter.get('/', (request, response) => {
    Person.find({}).then((Person) => {
      response.json(Person)
    })
  })
  
  personsRouter.get('/info', (request, response) => {
    const date = new Date().toString()
    Person.find({}).then((persons) => {
      response.send(`<p>Phone book has ${persons.length} entries</p><br>${date}`)
    })
  })
  
  personsRouter.get('/:id', (request, response, next) => {
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
  
  personsRouter.delete('/:id', (request, response,next) => {
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
  
  personsRouter.post('/', (request, response, next) => {
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
  
  personsRouter.put('/:id', (request, response, next) => {
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

module.exports=personsRouter