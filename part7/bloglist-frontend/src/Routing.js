import React from 'react'
import { useDispatch } from 'react-redux'
import ConnectedUserList from './components/UserList'
import ConnectedBlog from './components/Blog'
import ConnectedUserPage from './components/UserPage'
import ConnectedApp from './App'
import ConnectedAlert from './components/Alert'
import { setAlert } from './reducers/alertReducer'
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import { logoutUser } from './reducers/userReducer'

const RoutingMenu = ({ user }) => {
  const dispatch = useDispatch()

  const padding = {
    paddingRight: 5
  }

  const logout = () => {
    dispatch(logoutUser())
    setAlert('Successfully logged out')
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.username} logged in. <button onClick={logout}>Logout</button> <br/><br/>
        <ConnectedAlert></ConnectedAlert>
      </div>

      <Switch>
        <Route path="/users/:id">
          <ConnectedUserPage></ConnectedUserPage>
        </Route>
        <Route path="/users">
          <ConnectedUserList></ConnectedUserList>
        </Route>
        <Route path="/blogs/:id">
          <ConnectedBlog></ConnectedBlog>
        </Route>
        <Route path="/">
          <ConnectedApp></ConnectedApp>
        </Route>
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
})

const ConnectedRoutingMenu = connect(mapStateToProps, null)(RoutingMenu)


export default ConnectedRoutingMenu