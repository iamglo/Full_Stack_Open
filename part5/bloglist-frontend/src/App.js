import React, { useState, useEffect, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({ setUser, setAlert }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setAlert(`${user.username} is logged in`)
      setTimeout(() => {
        setAlert(null)
      }, 5000)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setAlert('wrong username or password')
      setTimeout(() => {
        setAlert(null)
      }, 5000)
    }
  }

  return(
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id = 'username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id = 'password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const Alert = ({ alert }) => {
  return (<div className="alert">{alert}</div>)
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState(null)

  const blogRef = React.createRef()
  const formRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a,b) => (a.likes > b.likes) ? -1 : 1)),
    )
    const store = window.localStorage.getItem('loggedBlogappUser')
    if (store !== null){
      setUser(JSON.parse(store))
      blogService.setToken(JSON.parse(store).token)
    }
  }, [])

  const likeBlog = async (blog) => {
    const temp =
    {
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes+1
    }
    await blogService.update(blog._id, temp)
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs.sort((a,b) => (a.likes > b.likes) ? -1 : 1))
  }

  const logout = () => {
    window.localStorage.removeItem(
      'loggedBlogappUser')
    setUser(null)
    setAlert('Successfully logged out')
  }

  if (user === null) {
    return (
      <div>
        <Alert alert={alert}> </Alert> <br/><br/>

        <h2>Log in to application</h2>
        <Toggle buttonLabel="login" ref={blogRef}>
          <LoginForm setUser={setUser} setAlert={setAlert}></LoginForm>
        </Toggle>
      </div>
    )}
  else{
    return (
      <div>
        <h2>blogs</h2>
        <Alert alert={alert}> </Alert> <br/><br/>

        {user.username} logged in. <button onClick={logout}>logout</button> <br/><br/>
        <Toggle buttonLabel="add blog" ref={formRef}>
          <BlogForm user={user} setAlert={setAlert} setBlogs={setBlogs} createBlog={blogService.create}></BlogForm>
        </Toggle>


        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} likeBlog={likeBlog}/>
        )}
      </div>
    )}
}


export default App