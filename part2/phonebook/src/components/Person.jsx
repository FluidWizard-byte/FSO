const ShowPersons=({persons,deleteFunction})=>{
    return(
      <div>
        <h2>Persons</h2>
        <table>
          <tbody>
          {persons.map(person=><tr key={person.id}>
            <td>{person.name}</td><td> {person.number}</td><td><button onClick={()=>deleteFunction(person.name,person.id)}>delete</button></td>
          </tr>)}
          </tbody>       
        </table>
      </div>
    )
  }

export default ShowPersons