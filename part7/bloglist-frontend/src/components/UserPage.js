import React,  {useEffect}  from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../reducers/userListReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useRouteMatch
} from "react-router-dom"
import { connect } from 'react-redux'

const UserPage = ({ user }) => {
  const dispatch = useDispatch()

  const match = useRouteMatch('/users/:id')

  useEffect(() => {
    dispatch(getUser(match.params.id))
  }, [dispatch])

  return (
    <div className="container">
      <h2> {user.name} </h2>
      <h3> added blogs </h3>
      {user.id === match.params.id? user.blogs.map(blog => <li key={blog._id}> { blog.title } </li>) : null }
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.userList.curUser
})

const ConnectedUserPage = connect(mapStateToProps, null)(UserPage)


export default ConnectedUserPage
