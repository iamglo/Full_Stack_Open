const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.notification
    default:
      return state
  }
}

export const notificationChange = notification => {
  return dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      notification,
    })
    setTimeout(() => {dispatch(notificationReset())}, 2000)
  }
}

export const notificationReset = () => {
  return {
    type: 'SET_MESSAGE',
    notification: "",
  }
}


export default notificationReducer