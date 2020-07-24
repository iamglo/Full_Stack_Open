import React, { useEffect } from 'react'
import {useDispatch } from 'react-redux'
import ConnectedAnecdotes from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import {init} from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(init())
  }, [dispatch])

  return (
    <div>
      <Notification></Notification>
      <Filter></Filter>
      <ConnectedAnecdotes></ConnectedAnecdotes>
      <AnecdoteForm></AnecdoteForm>
    </div>
  )
}

export default App