import React, { useEffect }  from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getUsers } from '../reducers/userListReducer'

const UserList = ({ userList }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return(
    <div>
      <h2>Users</h2>
      <Table >
        <tbody>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
          {userList.map(user =>
            <tr key={user._id}>
              <td>
                {user.name}
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userList: state.userList.users
})

const ConnectedUserList = connect(mapStateToProps, null)(UserList)


export default ConnectedUserList