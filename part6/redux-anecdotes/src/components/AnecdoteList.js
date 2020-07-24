
import React from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationReset } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const voteAnecdote = (anecdote) => {
    props.vote(anecdote.id)
    props.notificationChange(`you voted for ${anecdote.content}`)
  }
  
  return (  
  <div>
  <h2>Anecdotes</h2>
    {props.anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => voteAnecdote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>
    )
}

const mapStateToProps = (state) => {
  const filtered = anecdoteToShow(state)
  return {
    filter: state.filter,
    anecdotes: filtered
  }
}

const mapDispatchToProps = {
  vote,
  notificationChange
}

const anecdoteToShow = (state) => {
  if (state.filter !== ''){
    return state.anecdotes.filter(a => a.content.includes(state.filter))
  }
  else {
    return state.anecdotes
  }
}


const ConnectedAnecdotes = connect(
  mapStateToProps, 
  mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdotes