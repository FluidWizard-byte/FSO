const express=require('express')
const app=express()
const cors=require('cors')
const morgan=require('morgan')
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
require('dotenv').config()
const Note = require('./models/note')
const PORT=process.env.PORT
let notes = [

]

morgan.token('body',(req,res)=>{
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler=(error,request,response,next)=>{
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Invalid id' })
} 

next(error)
}

app.get('/',(request,response)=>{
    response.send('<h1>Hello World!!</h1>')
})

app.get('/api/notes',(request,response)=>{
    Note.find({}).then(notes=>{
      response.json(notes)
    })
})

app.get('/api/notes/:id',(request,response,next)=>{
  const id=request.params.id
  Note.findById(id).then(note=>{
    if(note){
      response.json(note)
    }
    else{
      response.status(404).end
    }
  }).catch(error=>next(error))
})

app.delete('/api/notes/:id',(request,response)=>{
  const id=request.params.id
  Note.findByIdAndDelete.then(result=>{
    response.status(204).end()
  }).catch(error=>next(error))
})

app.post('/api/notes', (request, response) => {
  const body = request.body
  
  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })

})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})
