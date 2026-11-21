// ====================================== //
// Imports
// ====================================== //

// ==== Dependencies/Lib ==== //
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Typography, Box } from '@mui/material'

// ==== Components ==== //
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import UserList from './components/UserList'

// ==== Services ==== //
import loginServices from './services/login'
import blogServices from './services/blog'

// ==== Contexts ==== //
import { useNotify } from './contexts/NotificationContext'
import { useUserValue, useUserDispatch } from './contexts/UserContext'

const App = () => {
  const activeUser = useUserValue()
  const userDispatch = useUserDispatch()
  const navigate = useNavigate()
  const notify = useNotify()

  // ====================================== //
  // Log-in Logic
  // ====================================== //
  const handleLogin = async ({ username, password }) => {
    try {
      const loggedInUser = await loginServices.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedInUser))
      userDispatch({ type: 'SET', payload: loggedInUser })
      blogServices.setToken(loggedInUser.token)
      navigate('/')
      notify(`${username} log in successfully`, 'success')
    } catch (error) {
      notify(error.response.data.error, 'error')
    }
  }

  // ====================================== //
  // Log-out - Logic
  // ====================================== //
  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogServices.setToken(null)
    notify(`${activeUser.username} log out successfully`, 'success')
    userDispatch({ type: 'CLEAR' })
    navigate('/')
  }

  return (
    <Container>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Blog App
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>

            <Button color="inherit" component={Link} to="/users">
              users
            </Button>

            {activeUser && (
              <Button color="inherit" component={Link} to="/create">
                new blog
              </Button>
            )}

            {activeUser ? (
              <Button color="inherit" onClick={handleLogOut}>
                logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Notification />

      <ErrorBoundary>
        <Routes>

          <Route path="/" element={<BlogList />} />

          <Route path="/users" element={<UserList />} />
          
          <Route
            path="/login"
            element={
              activeUser ? <Navigate replace to={'/'} /> : <LoginForm loginHandle={handleLogin} />
            }
          />

          <Route path="/blogs/:id" element={<Blog />} />

          <Route
            path="/create"
            element={activeUser ? <BlogForm /> : <Navigate replace to="/login" />}
          />

          <Route path="*" element={<NotFound />} />
          
        </Routes>

      </ErrorBoundary>
    </Container>
  )
}

export default App
