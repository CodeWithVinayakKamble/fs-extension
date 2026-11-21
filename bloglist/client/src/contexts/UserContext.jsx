import { createContext, useContext, useReducer} from 'react'
import blogService from '../services/blog'

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
  const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUser) {
    const user = JSON.parse(loggedUser)
    blogService.setToken(user.token)
    return user
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
