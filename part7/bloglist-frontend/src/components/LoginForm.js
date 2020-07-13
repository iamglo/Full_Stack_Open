import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import setAlert from '../reducers/alertReducer'
import setUser from '../reducers/userReducer'
import { connect } from 'react-redux'

const LoginForm = (props) => {
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
      props.setAlert(`${user.username} is logged in`)
      setTimeout(() => {
        setAlert(null)
      }, 5000)

      props.setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      props.setAlert('wrong username or password')
      setTimeout(() => {
        setAlert(null)
      }, 5000)
    }
  }

  return(
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label> username </Form.Label>
          <Form.Control
            id = 'username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label> password </Form.Label>
          <Form.Control
            id = 'password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button id="login-button" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const ConnectedLoginForm = connect(
  null,
  {
    setUser,
    setAlert
  })(LoginForm)

export default ConnectedLoginForm
// export default LoginForm