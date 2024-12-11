const Course=({course})=>{
    return(
      <div>
        <Header name={course.name}/>
        <Part parts={course.parts}/>
        <ExerciseTotal parts={course.parts}/>
      </div>
    )
  }

const Header=({name})=>{
    return(
        <h1>{name}</h1>
    )
}

const Part=({parts})=>{
    return(
        <div>
            {parts.map(part=><p key={part.id}>{part.name} {part.exercises}</p>)}
        </div>
    )
}

const ExerciseTotal=({parts})=>{
    return(
        <b>
          total of {parts.reduce((sum,part)=>sum+part.exercises,0)} exercises
        </b>
    )
}

export default Course