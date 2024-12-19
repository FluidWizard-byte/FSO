const express = require('express')
const config = require('./utils/config')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })



app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.use('/api/persons',personsRouter)

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports=app