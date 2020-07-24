import React, { useState } from 'react'
import {
  useHistory
} from 'react-router-dom'
import  { useField } from '../hooks'


const CreateNew = (props) => {
  const history = useHistory()

  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    history.push('/anecdotes')
    props.setNotification(`a new anecdote ${content.value} created!`)
    setTimeout(() => {props.setNotification(``)}, 5000)
  }

  const resetField = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  // const {reset, ...alt} = content 
  // const {reset, ...alt} = author 
  // const {reset, ...alt} = info 
  function removeProperty(obj, propertyName) {
    let { [propertyName]: _, ...result } = obj
    return result
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...removeProperty(content, 'reset')}/>
        </div>
        <div>
          author
          <input {...removeProperty(author, 'reset')}/>
        </div>
        <div>
          url for more info
          <input {...removeProperty(info, 'reset')}/>
        </div>
        <button>create</button>
        <button onClick={resetField}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew