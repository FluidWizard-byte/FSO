import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import axios from'axios'
import './index.css'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

// const promise = axios.get('http://localhost:3001/notes')
// console.log(promise)

// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)

// axios.get('http://localhost:3001/notes').then(Response=>{
//   const notes=Response.data
//   console.log(Response)
//   console.log(notes)
// })

// promise.then((response)=>{
//   console.log(response.data)
// })

ReactDOM.createRoot(document.getElementById('root')).render(
  <App/>
)