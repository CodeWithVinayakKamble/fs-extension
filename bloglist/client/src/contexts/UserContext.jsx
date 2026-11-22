import { createContext, useContext, useReducer } from 'react'
import blogService from '../services/blog'
import persistentUserService from '../services/persistentUser'
import loginService from '../services/login'
import userService from '../services/users'
import { useNavigate } from 'react-router-dom'
import { useNotify } from './NotificationContext'

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

export const useAuth = () => {
  const activeUser = useUserValue()
  const userDispatch = useUserDispatch()
  const notify = useNotify()
  const navigate = useNavigate()

  const login = async ({ username, password }) => {
    try {
      const loggedInUser = await loginService.login({ username, password })
      persistentUserService.saveUser(loggedInUser)
      userDispatch({ type: 'SET', payload: loggedInUser })
      blogService.setToken(loggedInUser.token)
      notify(`${username} log in successfully`, 'success')
      navigate('/')
    } catch (error) {
      notify(error.response?.data?.error || error.message, 'error')
    }
  }

  const logout = () => {
    persistentUserService.removeUser()
    blogService.setToken(null)
    notify(`${activeUser.username} log out successfully`, 'success')
    userDispatch({ type: 'CLEAR' })
    navigate('/')
  }

  const register = async ({ username, name, password }) => {
    try {
      await userService.createUser({ username, name, password })
      await login({ username, password })
      notify(`Welcome ${name}`, 'success')
      navigate('/')
    } catch (error) {
      notify(error.response?.data?.error || error.message, 'error')
    }
  }

  return { activeUser, login, logout, register }
}
