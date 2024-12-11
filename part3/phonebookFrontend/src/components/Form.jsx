const ShowForm=({name,number,formHandler,nameHandler,numberHandler})=>{
    return(
      <div>
         <h2>Add new person</h2>
        <form onSubmit={formHandler}>
          <div>
            name: <input value={name} onChange={nameHandler}/>
          </div>
          <div>
            number: <input value={number} onChange={numberHandler} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
  }

export default ShowForm