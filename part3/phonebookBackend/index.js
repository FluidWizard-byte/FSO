const express=require('express')
const app=express()

const morgan=require('morgan')

morgan.token('body',(req,res)=>{
    return JSON.stringify(req.body)
})

const PORT=process.env.port || 3001

let persons=[
    { 
      "id": "1",
      "name": "Artino Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
//   }
  
app.use(express.json())
//   app.use(requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
  
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  


app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

app.get('/api/info',(request,response)=>{
    const date=new Date().toString()
    response.send(`<p>Phone book has ${persons.length} entries</p><br>${date}`)
})

app.get('/api/persons/:id',(request,response)=>{
    const id=request.params.id
    const person=persons.find(person=>person.id==id)
    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})


app.delete('/api/persons/:id',(request,response)=>{
    const id=request.params.id
    deletedPerson=persons.find(person=>person.id==id)
    persons=persons.filter(person=>person.id!=id)
    response.json(deletedPerson)
})

const generateId=()=>{
    return Math.floor(Math.random()*123456789)
}

app.post('/api/persons',(request,response)=>{
    const body = request.body
    if(body.name && body.number){
        const nameExists=persons.find(person=>person.name.toLocaleLowerCase()===body.name)
        const numberExists=persons.find(person=>person.number===body.number)

        if(nameExists){
            return response.status(400).json(
                {
                    "error":"name already exists in phonebook"
                }
            )
        }

        if(numberExists){
            return response.status(400).json(
                {
                    "error":"number already exists in phonebook"
                }
            )
        }

        const person= {
            id: generateId().toString(),
            name: body.name,
            number: body.number,
          }

          persons = persons.concat(person)

          response.json(person)

    }
    else{
        return response.status(400).json(
            {
                "error":"invalid request"
            }
        )
    }
})

app.use(unknownEndpoint)

app.listen(PORT,()=>{
    console.log(`listening at port ${PORT}`)
})