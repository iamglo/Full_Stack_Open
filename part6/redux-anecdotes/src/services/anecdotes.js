import axios from 'axios'
import {asObject} from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async(anecdote) => {
  const content = asObject(anecdote)
  const response = await axios.post(baseUrl, content)
  return response.data
}

const update = async(id, content) => {
  const response = await axios.put(`${baseUrl}/${id}`, content)
  return response.data
}

const get = async(id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, create, update, get}