const express=require('express')
const app=express()
const cors=require('cors')
const morgan=require('morgan')
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
require('dotenv').config();

const PORT=process.env.PORT || 3001

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Note = mongoose.model('Note', noteSchema)

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  },
  {
    id:"4",
    content:"Express",
    important:true
  }
]

morgan.token('body',(req,res)=>{
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/',(request,response)=>{
    response.send('<h1>Hello World!!</h1>')
})

app.get('/api/notes',(request,response)=>{
    Note.find({}).then(notes=>{
      response.json(notes)
    })
})

app.get('/api/notes/:id',(request,response)=>{
  const id=request.params.id
  const note=notes.find(note=>note.id===id)
  if(note){
    response.json(note)
  }
  else{
    response.status(404).end()
  }
})

app.delete('/api/notes/:id',(request,response)=>{
  const id=request.params.id
  notes=notes.filter(note=>note.id!==id)
  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.use(unknownEndpoint)
app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})
