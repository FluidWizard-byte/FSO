import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ] 
  const [selected, setSelected] = useState(0)
  const [votes,setVotes]= useState(new Uint8Array(anecdotes.length))
  const [topVoted,setTopVoted]=useState(0)

  const getRandomAnecdote=(max)=>{
    const getAnecdote=()=>{      
      const anecdoteIndex=(Math.floor(Math.random()*max))    
      setSelected(anecdoteIndex);
    }
    return getAnecdote
  }

  const voteAnecdote=()=>{
    const currentAnecdoteIndex=selected
    const copy=[...votes]
    copy[currentAnecdoteIndex]+=1
    setVotes(copy)
    setTopVoted(getIndexofMax(copy))
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <DisplayVotes votes={votes[selected]}/>
      <Button clickHandler={voteAnecdote} text='vote'/>
      <Button clickHandler={getRandomAnecdote(anecdotes.length)} text='next anecdote'/>
      <DisplayTopVotedAnecdote anecdote={anecdotes[topVoted]}/>
      <DisplayVotes votes={votes[topVoted]}/>
    </div>
  )
}

const DisplayTopVotedAnecdote=({anecdote})=>{
  return(
    <div>
      <h1>Top voted anecdote</h1>
      <p>{anecdote}</p>
    </div>
  )  
}

const DisplayVotes=({votes})=>{
    return(
      <p>has {votes} votes</p>
    )  
}

const Button=({clickHandler,text})=>{
  return(
    <button onClick={clickHandler}>{text}</button>
  )
}

const getIndexofMax=(arr)=>{
  var maxIndex=0
  var maxValue=arr[0]
  for(var i=0;i<arr.length;i++){
    if (arr[i]>maxValue){
      maxValue=arr[i]
      maxIndex=i
    }
  }
  return maxIndex
}

export default App