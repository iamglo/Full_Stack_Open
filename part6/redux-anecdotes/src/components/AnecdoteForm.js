
import React from 'react'
import {useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'
import { notificationChange, notificationReset } from '../reducers/notificationReducer'
import noteService from '../services/anecdotes.js'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.add(content)
    props.notificationChange(`you added ${content}`)
  }

  return (
  <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input id="anecdote"/></div>
      <button>create</button>
    </form>
  </div>
  )

}

const mapDispatchToProps = dispatch => {
  return {
    add: content => {
      dispatch(add(content))
    },
    notificationChange
  }
}

export default connect (
  null,
  mapDispatchToProps
  )(AnecdoteForm)