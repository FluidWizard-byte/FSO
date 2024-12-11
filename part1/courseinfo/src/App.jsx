
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  console.log(course.name)

  return (
    <div>
      <Header Title={course.name}/>
      <Content part={course.parts[0].name } exercise={course.parts[0].exercises }/>
      <Content part={course.parts[1].name } exercise={course.parts[1].exercises }/>
      <Content part={course.parts[2].name } exercise={course.parts[2].exercises }/>
      <Total e1={course.parts[0].exercises } e2={course.parts[1].exercises} e3={course.parts[2].exercises }/>
    </div>
  )
}

const Header=(props)=>{
  return(
    <>
    <h1>{props.Title}</h1>
    </>
  )
}
const Content=(props)=>{
  return(
    <>
      <h2>
        {props.part} {props.exercise}
      </h2>
    </>
  )
}
const Total=(props)=>{
  return(
    <>
    Total number of exercises {props.e1+props.e2+props.e3}
    </>
  )
}
export default App