import React, { useEffect, useState }  from 'react'
import { likeBlog, deleteBlog, initCurBlog,addComment } from '../reducers/blogReducer'
import { setAlert, resetAlert } from '../reducers/alertReducer'
import { connect } from 'react-redux'

import Toggle from '../components/Toggle'

// import { isCompositeComponent } from 'react-dom/test-utils'
import {
  BrowserRouter as Router,
  useRouteMatch,
  useHistory
} from "react-router-dom"
import { Form, Button } from 'react-bootstrap'

const Blog = ({ user, blog, likeBlog, deleteBlog, setAlert, initCurBlog, resetAlert, addComment}) => {
  const [comment, setComment] = useState('')
  // const [visible, setVisible] = useState(false)

  // const hideWhenVisible = { display: visible ? 'none' : '' }
  // const showWhenVisible = { display: visible ? '' : 'none' }
  // const toggleVisibility = () => {
  //   setVisible(!visible)
  // }
  const formRef = React.createRef()
  const history = useHistory()
  const match = useRouteMatch('/blogs/:id')

  useEffect(() => {
    initCurBlog(match.params.id)
  }, [])

  const dBlog = (blog) => {
    if (user.username === blog.user.username){
      if (window.confirm(`remove ${blog.name} by ${blog.author}?`)){
        deleteBlog(blog._id)
        history.push('/')
      }
    }
    else(
      window.alert('you are not authorized to delete this blog')
    )
  }

  const lBlog = (blog) => {
    likeBlog(blog._id)
    setAlert(`${blog.title} liked`)
    resetAlert(5000)
  }

  const aComment = (event) => {
    event.preventDefault()
    addComment(match.params.id, comment)
    setAlert(`${blog.title} commented`)
    setComment('')
    resetAlert(5000)
  }


  return (
    <div data-testid='main' className="container">
      <h2> {blog.title} {blog.author} </h2>
      <div data-testid='details'>
        url: {blog.url} <br/>
        likes: {blog.likes}  <button onClick={() => lBlog(blog)}>like</button><br/>
        added by: {blog.user ? blog.user.name : null} <br/>
        <button onClick={() => dBlog(blog)}>delete</button>
      </div>
      <br></br>
      <div>
        <h4> Comments </h4>
        {blog.comments ? blog.comments.map(c => <li> {c} </li>): null}
        <Toggle buttonLabel="add comment" ref={formRef}>
          <div>
            <Form onSubmit={aComment}>
              <Form.Group>
                <Form.Label> comment: </Form.Label>
                <Form.Control as="textarea" rows="3" value={comment} onChange={({ target }) => setComment(target.value)} />
              </Form.Group>
              <Button type="submit">add comment</Button> <br/><br/>
            </Form>
          </div>
        </Toggle>
        <br></br>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blog: state.blogs.curBlog
  }
}

const mapDispatchToProps = {
  likeBlog,
  deleteBlog,
  setAlert,
  initCurBlog,
  resetAlert,
  addComment
}

const ConnectedBlog = connect(
  mapStateToProps,
  mapDispatchToProps)(Blog)

export default ConnectedBlog