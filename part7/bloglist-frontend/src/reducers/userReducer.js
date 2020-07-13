import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type){
  case 'SET':{
    return action.data
  }
  default:
    return state
  }
}


export const initUser = () => {
  return async dispatch => {
    const store = window.localStorage.getItem('loggedBlogappUser')

    if (store !== null){
      dispatch({
        type: 'SET',
        data: JSON.parse(store)
      })
      blogService.setToken(JSON.parse(store).token)
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'SET',
      data: null
    })
  }
}


export default reducer
