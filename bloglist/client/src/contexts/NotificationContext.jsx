import { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

// # The reducer function (controller)
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  return context[0]
}

export const useNotify = () => {
  const context = useContext(NotificationContext)
  const dispatch = context[1]

  return (message, type = 'success', seconds = 3) => {
    dispatch({
      type: 'SET',
      payload: { message, type },
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, seconds * 1000)
  }
}

export default NotificationContext
