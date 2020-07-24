import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useRouteMatch
} from "react-router-dom"
import {withRouter} from 'react-router';

const Anecdote = ({anecdotes}) => {

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(a => Number(a.id) === Number(match.params.id)) : null
  
  return (<div> 
    <h1> {anecdote.content} </h1> <br/>
    has {anecdote.votes} votes
  </div>)
}

export default withRouter(Anecdote)