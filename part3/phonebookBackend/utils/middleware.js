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

  module.exports = {
    unknownEndpoint,
    errorHandler
  }