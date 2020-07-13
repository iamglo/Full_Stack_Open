import userService from '../services/users'

const initialState = {
  users: [],
  curUser: []
}

const reducer = (state = initialState, action) => {
  switch(action.type){
  case 'SET_USERS':{
    return Object.assign({}, state, {
      users: action.data
    })
  }
  case 'SET_CUR':{
    return Object.assign({}, state, {
      curUser: action.data
    })
  }
  default:
    return state
  }
}

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getUsers()
    dispatch({
      type: 'SET_USERS',
      data: users
    })
  }
}

export const getUser = (id) => {
  return async dispatch => {
    const user = await userService.getUser(id)
    dispatch({
      type: 'SET_CUR',
      data: user
    })
  }
}

export default reducer