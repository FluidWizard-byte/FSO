import { useState, useEffect } from "react"
import Note from "./components/Note"
import noteService from './services/notes'
import Notification from "./components/Notification"
import Footer from "./components/Footer"

const App = () => {
const [notesList,setNotesList]=useState([])
const [newNote,setNewNote]=useState('...add a note')
const [showAll,setshowAll]=useState(true)
const [buttonText,setButtonText]=useState('Show Important Only')
const [errorMessage, setErrorMessage] = useState(null)


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
    setNotes(notes.filter(n => n.id !== id))
  })
}


const notesToShow=showAll?notesList:notesList.filter(note=>note.important===true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notesToShow.map(note=><Note key={note.id} note={note} toggleImportant={()=>toggleImportant(note.id)}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNewNote}/>
        <button type="submit">Add</button>
      </form>
      <button onClick={showImportant}>
        {buttonText}
      </button>
      <Footer/>
    </div>
  )
}



export default App