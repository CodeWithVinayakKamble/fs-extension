import { createContext, useContext, useReducer } from 'react'
import blogService from '../services/blog'
import persistentUserService from '../services/persistentUser'

const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const getInitialUser = () => {
  const loggedUser = persistentUserService.getUser()
  if (loggedUser) {
    blogService.setToken(loggedUser.token)
    return loggedUser
  }
  return null
}

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null, getInitialUser)

  return <UserContext.Provider value={[user, userDispatch]}>{children}</UserContext.Provider>
}

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}
