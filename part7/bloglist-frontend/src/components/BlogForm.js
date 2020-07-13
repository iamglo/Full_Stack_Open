import React, { useState }  from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setAlert } from '../reducers/alertReducer'


const BlogForm = ({ user, addBlog, setAlert }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const aBlog = async (event) => {
    event.preventDefault()
    try {
      let newBlog = {
        'title' : newTitle,
        'author': newAuthor,
        'url' : newUrl,
        'user' : user,
        'likes' : 0
      }

      addBlog(newBlog)
      setAlert(`${newTitle} successfully added`)
      setTimeout(() => {
        setAlert(null)
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')


    } catch (exception) {
      setAlert(exception)
      setTimeout(() => {
        setAlert(null)
      }, 5000)
    }
  }

  return(
    <div className="formDiv">
      <Form onSubmit={aBlog}>
        <Form.Group>
          <Form.Label> title: </Form.Label>
          <input id='title' data-testid='title' value={newTitle} onChange={({ target }) => setTitle(target.value)} /> <br/>
          <Form.Label> author: </Form.Label>
          <input id='author' data-testid='author' value={newAuthor} onChange={({ target }) => setAuthor(target.value)}/> <br/>
          <Form.Label> url: </Form.Label>
          <input id='url' data-testid='url' value={newUrl} onChange={({ target }) => setUrl(target.value)} /> <br/>
          <Button type="submit">create</Button> <br/><br/>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  addBlog,
  setAlert
}
const ConnectedBlogForm = connect(
  null,
  mapDispatchToProps)(BlogForm)

export default ConnectedBlogForm