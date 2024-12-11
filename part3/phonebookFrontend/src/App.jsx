import { useState, useEffect } from 'react'
import axios from 'axios'
import ShowForm from './components/Form'
import ShowPersons from './components/Person'
import Filter from './components/Filter'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter,setNewFilter]=useState('')
  const [newNotification,setNewNotification]=useState(null)
  const [newNotificationType,setNewNotificationType]=useState(null)

  const hook=()=>{
    phonebookService.getAll().then(
      (persons=>setPersons(persons))
    )
  }

  useEffect(hook,[])

  const deletePerson=(name,id)=>{
    if(window.confirm(`Delete ${name} ?`)){
      phonebookService.deletePerson(id).then(
        (deletedPerson)=>{
         const newPersons=persons.filter(person=>person.id!==deletedPerson.id)
         setPersons(newPersons)
         setNewNotificationType('success')
         setNewNotification(`Removed ${name}`)
         setTimeout(() => {
          setNewNotificationType(null)
          setNewNotification(null)
         }, 2500);
        }
      ).catch(error=>{
        setNewNotificationType('error')
        setNewNotification(`Information on ${newName} has already been deleted or information is not available`)
        setTimeout(() => {
        setNewNotificationType(null)
        setNewNotification(null)
        }, 2500);
    })
    }  
  }

  const enterNewName=(event)=>{
    setNewName(event.target.value)
  }

  const enterNewNumber=(event)=>{
    setNewNumber(event.target.value)
  }

  const handleFilter=(event)=>{
    setNewFilter(event.target.value)
  }

  const handleForm=(event)=>{
    event.preventDefault()
    
    const newPerson={name:newName,number:newNumber}
    const nameExists=persons.indexOf(persons.find((person)=>person.name===newPerson.name))
    if(nameExists===-1){
      phonebookService.create(newPerson).then(
        (addedPerson)=>{
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
          setNewNotificationType('success')
          setNewNotification(`Added ${newName}`)
          setTimeout(() => {
          setNewNotificationType(null)
          setNewNotification(null)
          }, 2500);
        }
      )
    }
    else{
      if(window.confirm(`${newName} is already added to the phonebook, replace the existing number?`)){
          const personObject=persons[nameExists]
          const alteredPersonObject={...personObject ,number:newPerson.number}
          phonebookService.update(alteredPersonObject,alteredPersonObject.id).then(
            (updatedPerson=>{
              const newPersons=persons.map(person=>person.id===updatedPerson.id?updatedPerson:person)
              setPersons(newPersons)
              setNewNotificationType('success')
              setNewNotification(`Updated ${newName}`)
              setTimeout(() => {
              setNewNotificationType(null)
              setNewNotification(null)
              }, 2500);
            })
          ).catch(error=>{
              setNewNotificationType('error')
              setNewNotification(`Information on ${newName} has already been deleted or information is not available`)
              setTimeout(() => {
              setNewNotificationType(null)
              setNewNotification(null)
              }, 2500);
          })
          
      }
    }
    
  }

  const filteredPersons=newFilter===''? 
  persons:persons.filter((person)=>person.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification} messageType={newNotificationType}/>
      <Filter value={newFilter} eventHandler={handleFilter}/>
      <ShowForm name={newName} number={newNumber} formHandler={handleForm} nameHandler={enterNewName} numberHandler={enterNewNumber}/>
      <ShowPersons persons={filteredPersons} deleteFunction={deletePerson}/>
    </div>
  )
}




export default App