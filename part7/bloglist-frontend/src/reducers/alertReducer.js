
const reducer = (state = null, action) => {
  switch(action.type){
  case 'SET_ALERT':{
    return action.data
  }
  case 'RESET_ALERT':{
    return null
  }
  default:
    return state
  }
}

export const setAlert = (alert) => {
  return async dispatch => {
    dispatch({
      type: 'SET_ALERT',
      data: alert
    })
  }
}

export const resetAlert = (n) => {
  return async dispatch => {
    setTimeout(() => {dispatch({ type: 'RESET_ALERT' })}, n)
  }
}

export default reducer