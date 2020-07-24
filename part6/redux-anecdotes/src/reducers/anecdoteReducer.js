import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  switch(action.type){
    case "VOTE":{
      const content = action.data
      const id = action.data.id
      return state.map(a => a.id !== id ? a: content).sort((a,b) => a.votes>b.votes ? -1:1)
    }
    case "ADD":{
      return state.concat(action.data).sort((a,b) => a.votes>b.votes ? -1:1)
    }
    case "INIT_ALL": {
      return action.data.sort((a,b) => a.votes>b.votes ? -1:1)
    }
    default:
      return state
 }
}

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const vote = (id) => {
  return async dispatch => {
    let toMod = await anecdoteService.get(id)
    toMod = {...toMod, votes: toMod.votes+1 }
    const updated = await anecdoteService.update(id, toMod)
    dispatch({
      type: "VOTE",
      data: updated
  })}
}

export const init = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ALL",
      data: anecdotes
    })
  }
}

export const add = (anecdote) => {
  return async dispatch => {
  const newAnecdote = await anecdoteService.create(anecdote)
  console.log(newAnecdote)
    dispatch({
      type: "ADD",
      data: newAnecdote
    })
  }
}


export default reducer