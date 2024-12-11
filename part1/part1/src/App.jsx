import { useState } from "react"

const App=()=>{
  const now=new Date()
  const [counter,setCounter]=useState(0)
  const [clicks,setClicks]=useState({
    left:0,
    right:0
  })
  const [allClicks,setAllClicks]=useState([])
  const [left,setLeft]=useState(0)
  const [right,setRight]=useState(0)
  const [total,setTotal]=useState(0)
  const a=1
  const b=2
  var friends=['Samwise','Merry','Pippin']
  

  const handleLeftClick=()=>{
    const newCLicks=({left:clicks.left+1,right:clicks.right})
    setClicks(newCLicks)
    setAllClicks(allClicks.concat('L'))
    var updateLeft=left+1
    setLeft(updateLeft)
    setTotal(updateLeft+right)
  }
  const handleRightClick=()=>{
    console.log('right')
    const newCLicks=({left:clicks.left,right:clicks.right+1})
    console.log(clicks.left)
    console.log(clicks.right)
    setClicks(newCLicks)
    setAllClicks(allClicks.concat('R'))
    var updateRight=right+1
    setRight(updateRight)
    setTotal(updateRight+left)
  }

  const increaseBy1=()=>{
    setCounter(counter+1)
  }
  const zero=()=>{
    setCounter(0)
  }
  const decreaseBy1=()=>{
    setCounter(counter-1)
  }

  return(
    <div>

      <Display counter={counter}/>
      <DisplayLeft counter={clicks.left}/>
      <DisplayRight counter={clicks.right}/>
      <History totalClicks={total}/>
      <>{allClicks.join(' ')}</>
      <h1>Hello World!</h1>     
      <Hello name='Frodo' age='45'/>
      <Hello name='Gandalf' age={a+3}/>
      <p>Today is {now.toDateString()}</p>
      <p>{a} + {b} = {a+b}</p>
      <p>{friends}</p>
      <button onClick={increaseBy1}>ADD 1</button>
      <button onClick={zero}>ZERO</button>
      <button onClick={decreaseBy1}>SUBTRACT 1</button>
      <button onClick={handleLeftClick}>LEFT + 1</button>
      <Button eventHandler={handleRightClick} text='Right +1'/>
      <Footer/>
    </div>
    
  )
}

const History=({totalClicks})=>{
  if(totalClicks>0){
    return(
      <div>
        Button has been clicked {totalClicks} times
      </div>
    )
  }else{
    return(
      <div>
        Button has not been clicked
      </div>
    )
  }
}

const Button=(props)=>{
  return(
    <button onClick={props.eventHandler}>
      {props.text}
    </button>
  )
}

const DisplayLeft=({counter})=>{
  return(
    <div>
      LEFT: {counter}
    </div>
  )
}
const DisplayRight=({counter})=>{
  return(
    <div>
      Right: {counter}
    </div>
  )
}
const Display=({counter})=>{
  return(
    <div>
      {counter}
    </div>
  )
}

const Hello=({name,age})=>{

  const birthYear=()=>{
    const yearNow=new Date().getFullYear();
    return yearNow-age
  }

  
  return(
    <div>
      <h1>
        Greetings {name} you are {age} years old, you were probably born in {birthYear()}
      </h1>
    </div>
  )
}


const Footer=()=>{
  return(
    <div>
      Learning react from <a href="https://fullstackopen.com/en/" target="#">Fullstackopen</a>
    </div>
  )
}
export default App