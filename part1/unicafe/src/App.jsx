import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll]=useState(0)
  const [average, setAverage]=useState(0)
  const [positive,setPositive]=useState(0)

  const goodPressed=()=>{
    setGood(good+1)
  }
  const neutralPressed=()=>{
    setNeutral(neutral+1)
  }
  const badPressed=()=>{
    setBad(bad+1)
  }
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button clickHandle={goodPressed} text='good'/>
      <Button clickHandle={neutralPressed} text='neutral'/>
      <Button clickHandle={badPressed} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Statistics=({good,neutral,bad})=>{
  console.log(good,neutral,bad)
  const all=good+bad+neutral
  const average=all/3
  const positive=good/all*100
  if(all==0){
    return(
      <h2>No feedback given</h2>
    )
  }
    return(
      <>
      <table>
        <thead>
          <tr>
            <td>
            <h2>Statistics</h2>
            </td>            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              good
            </td>
            <td>
              {good}
            </td>
          </tr>
          <tr>
            <td>
              neutral
            </td>
            <td>
              {neutral}
            </td>
          </tr>
          <tr>
            <td>
              bad
            </td>
            <td>
              {bad}
            </td>
          </tr>
          <tr>
            <td>
              all
            </td>
            <td>
              {all}
            </td>
          </tr>
          <tr>
            <td>
              average
            </td>
            <td>
              {average}
            </td>
          </tr>
          <tr>
            <td>
              positive
            </td>
            <td>
              {positive}%
            </td>
          </tr>
        </tbody>
      </table>
      </>
    )
}


const Button=(props)=>{
  return(
    <button onClick={props.clickHandle}>
      {props.text}
    </button>
  )
}

export default App