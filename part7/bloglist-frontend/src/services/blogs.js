import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const get = async (id) => {
  const request = await axios.get(`${ baseUrl}/${id}`)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.put(`${ baseUrl}/${id}`, newObject, config)

  return request.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.delete(`${ baseUrl}/${id}`, config)

  return request.data
}

const addComment = async(id, commentRequest) => {
  const request = await axios.put(`${ baseUrl}/${id}/comments`, commentRequest)
  return request.data
}

export default { getAll, get, create, update, deleteBlog, setToken, addComment }