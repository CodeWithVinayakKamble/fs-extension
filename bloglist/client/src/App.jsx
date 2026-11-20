// ====================================== //
// Imports
// ====================================== //

// ==== Dependencies/Lib ==== //
import { useState, useEffect } from 'react'
import { Routes, Route, Link, Navigate, useNavigate, useMatch } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Typography, Box } from '@mui/material'

// ==== Components ==== //
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'

// ==== Services ==== //
import loginServices from './services/login'
import blogServices from './services/blog'
import { useNotify } from './contexts/NotificationContext'
import { useBlogs } from './hooks/useBlogs'

// ====================================== //
// App
// ====================================== //
const App = () => {
  const [user, setUser] = useState(null)
  const { blogs, isError, isPending } = useBlogs()
  const navigate = useNavigate()
  const notify = useNotify()

  // ====================================== //
  // Getting user from localStorage
  // ====================================== //

  useEffect(() => {
    const loggedUserInLocalStorage = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserInLocalStorage) {
      const user = JSON.parse(loggedUserInLocalStorage)
      setUser(user)
      blogServices.setToken(user.token)
    }
  }, [])

  // ====================================== //
  // Log-in Logic
  // ====================================== //
  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginServices.login({ username, password })
      console.log('Logged in with', username)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      blogServices.setToken(user.token)
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
    setUser(null)
    navigate('/')
  }

  // ====================================== //
  // Http Put method to change likes
  // ====================================== //
  const handleLike = async (id) => {
    // const blog = blogs.find((b) => b.id === id)
    // const changedBlog = { ...blog, likes: blog.likes + 1 }

    // try {
    //   const updatedBlog = await blogServices.update(id, changedBlog)
    //   setBlogs(blogs.map((blog) => (blog.id === id ? { ...updatedBlog, user: blog.user } : blog)))
    // } catch (error) {
    //   console.log(`${error.response.data.error}`)
    // }
  }

  // ====================================== //
  // Http Delete Method
  // ====================================== //
  const deleteBlogOf = async (id) => {
    console.log(id)
  }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs?.find((blog) => blog.id === match.params.id) : undefined

  if (isError) {
    return <span>blog service not available due to problems in server</span>
  }

  if (isPending) {
    return <span>Loading...</span>
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
            {user && (
              <Button color="inherit" component={Link} to="/create">
                new blog
              </Button>
            )}
            {user ? (
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
          <Route path="/" element={<BlogList blogs={blogs} />} />

          <Route
            path="/login"
            element={user ? <Navigate replace to={'/'} /> : <LoginForm loginHandle={handleLogin} />}
          />

          <Route
            path="/blogs/:id"
            element={
              <Blog
                blog={blog}
                activeUser={user}
                increaseLikes={handleLike}
                deleteBlog={deleteBlogOf}
              />
            }
          />

          <Route path="/create" element={user ? <BlogForm /> : <Navigate replace to="/login" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App
