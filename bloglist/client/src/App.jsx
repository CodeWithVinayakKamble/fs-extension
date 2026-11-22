// ====================================== //
// Imports
// ====================================== //

// ==== Dependencies ==== //
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Typography, Box } from '@mui/material'

// ==== Components ==== //

// ==== blogs
import BlogList from './components/blogs/BlogList'
import Blog from './components/blogs/Blog'
import BlogForm from './components/blogs/BlogForm'

// ==== user
import UserList from './components/users/UserList'
import User from './components/users/User'
import UserRegistration from './components/users/UserRegistration'

// ==== auth
import LoginForm from './components/auth/LoginForm'

// ==== common
import Notification from './components/common/Notification'
import ErrorBoundary from './components/common/ErrorBoundary'
import NotFound from './components/common/NotFound'

// ==== useAuth Hook ==== //
import { useAuth } from './contexts/UserContext'

const App = () => {
  const { activeUser, logout } = useAuth()
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
              <Button color="inherit" onClick={logout}>
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

          <Route path="/users/:id" element={<User />} />

          <Route
            path="/login"
            element={activeUser ? <Navigate replace to={'/'} /> : <LoginForm />}
          />

          <Route
            path="/register"
            element={activeUser ? <Navigate replace to="/" /> : <UserRegistration />}
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
