import { useState, useEffect } from "react"
import Note from "./components/Note"
import noteService from './services/notes'
import Notification from "./components/Notification"
import Footer from "./components/Footer"
import loginService from './services/login'

const App = () => {
const [notesList,setNotesList]=useState([])
const [newNote,setNewNote]=useState('...add a note')
const [showAll,setshowAll]=useState(true)
const [buttonText,setButtonText]=useState('Show Important Only')
const [errorMessage, setErrorMessage] = useState(null)
const [username,setUsername]=useState('')
const [password,setPassword]=useState('')
const [user,setUser]=useState(null)



const hook=()=>{
  noteService.getAll().then((initialNotes)=>{
    setNotesList(initialNotes)   
  })  
}

useEffect(hook,[])
//console.log('rendered', notesList.length,'notes')
// useEffect(()=>{
//   console.log('useEffect')
//   axios.get('http://localhost:3001/notes')
//   .then((Response)=>{
//     console.log('promise fulfilled')
//     setNotesList(Response.data)
//   })
// },[])
// console.log('rendered', notesList.length,'notes')

const addNote=(event)=>{
  event.preventDefault()
  const noteObject={
    content:newNote,
    important:Math.random()<0.5,
    // id:String(notesList.length + 1)
  }
  // setNotesList(notesList.concat(noteObject))
 
  noteService.create(noteObject).then(note=>{
    setNotesList(notesList.concat(note))
    setNewNote('')
  }
  )
 

}

const handleNewNote=(event)=>{
  setNewNote(event.target.value)
}

const showImportant=()=>{
  setshowAll(!showAll)
  if(showAll){
    setButtonText('Show All')
  }
  else{
    setButtonText('Show Important Only')
  }
}

const toggleImportant=(id)=>{
  const note=notesList.find(note=>note.id==id)
  const changedNote={...note,important:!note.important}
  
  noteService.update(id,changedNote).then(
    updatedNote=>{
      setNotesList(notesList.map(note=>note.id===id?updatedNote:note))
    }
  ).catch(error => {
    setErrorMessage(
      `Note '${note.content}' was already removed from server`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    
  })
}

const handleLogin=async (e)=>{
  e.preventDefault()
  try{
    const loggedInUser = await loginService.login({
      username, password,
    })
    console.log(loggedInUser)
    noteService.setToken(loggedInUser.token)
    setUser(loggedInUser)
    setUsername('')
    setPassword('')
    console.log(user)
  }
  catch(error){
    setErrorMessage('Invalid Credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

}

const loginForm = () => (
  <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>      
)

const noteForm = () => (
  <form onSubmit={addNote}>
    <input
      value={newNote}
      onChange={handleNewNote}
    />
    <button type="submit">save</button>
  </form>  
)


const notesToShow=showAll?notesList:notesList.filter(note=>note.important===true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      
      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in</p>
        {noteForm()}
      </div>
    }
      <ul>
        {notesToShow.map(note=><Note key={note.id}  toggleImportant={()=>toggleImportant(note.id)} note={note} />)}
      </ul>
      <button onClick={showImportant}>
        {buttonText}
      </button>
      <Footer/>
    </div>
  )
}



export default App