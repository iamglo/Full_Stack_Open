import React, { useEffect } from 'react'
import ConnectedBlogList from './components/BlogList'
import ConnectBlogForm from './components/BlogForm'
import ConnectedLoginForm from './components/LoginForm'


import Toggle from './components/Toggle'
import { init } from './reducers/blogReducer'
import { initUser, logoutUser } from './reducers/userReducer'
import { connect } from "react-redux";


const App = ({ user, init, initUser }) => {

  const blogRef = React.createRef()
  const formRef = React.createRef()

  useEffect(() => {
    init()
    initUser()
  }, [])


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Toggle buttonLabel="login" ref={blogRef}>
          <ConnectedLoginForm></ConnectedLoginForm>
        </Toggle>
      </div>
    )}
  else{
    return (
      <div className="container">
        <h2>Posts</h2>
        <br></br>
        <Toggle buttonLabel="add blog" ref={formRef}>
          <ConnectBlogForm user={user} ></ConnectBlogForm>
        </Toggle>
        <br></br>
        <ConnectedBlogList user={user}></ConnectedBlogList>
      </div>
    )}
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {
  init,
  initUser
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp