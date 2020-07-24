import React from 'react'
import Anecdote from './Anecdote'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useRouteMatch,
  useHistory
} from "react-router-dom"


const AnecdoteList = ({ anecdotes }) => {
  const history = useHistory()
  
  return (
    <div>
    <h2>Anecdotes</h2>
    
    <ul>
      {anecdotes.map(anecdote => {
      return(<li key={anecdote.id} onClick={()=>history.push(`/anecdotes/${anecdote.id}`)}> {anecdote.content} </li>)
      })}
    </ul>
    </div>
  )
}

export default AnecdoteList