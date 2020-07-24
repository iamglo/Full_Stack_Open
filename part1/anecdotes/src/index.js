import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Maximum = (props) =>{
  const {points, anecdotes} = props
  var max = 0
  var index = 0 

  for(const [key, value] of Object.entries(points)) {
    if(value > max) {
      max = value;
      index = key;
    }
  }

  return (
    <div>
      <b> Anecdotes with the most votes </b><br></br>
      {anecdotes[index]} <br></br>
      has {max} votes.
    </div>
  )
}
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({})

  const generate = (lst) => {
    setSelected(Math.floor(Math.random() * lst.length)); 
  }

  const vote = (i) => {
    const copy = {...points}
    if (i in copy){
      copy[i] += 1
    }
    else{
      copy[i] = 1
    }
    setPoints(copy)
    console.log(copy, points, selected, i)
  }

  return (
    <div>
      <b> Anecdotes of the day </b> <br></br>
      {props.anecdotes[selected]} <br></br>
      has {(selected in points) ? points[selected] : "0" } votes <br></br>
      <button onClick={() => generate(anecdotes)}>next anecdote</button>
      <button onClick={() => vote(selected)}>vote</button>
      <br></br>
      <br></br>
      <Maximum points={points} anecdotes={props.anecdotes}></Maximum>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)