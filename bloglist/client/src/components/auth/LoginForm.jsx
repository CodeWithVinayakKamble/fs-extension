import { TextField, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useField } from '../../hooks/useField'
import { useAuth } from '../../contexts/UserContext'

const LoginForm = () => {
  const { reset: resetUsername, ...usernameProps } = useField('text', 'username')
  const { reset: resetPassword, ...passwordProps } = useField('password', 'password')
  const navigate = useNavigate()
  const { login } = useAuth()

  const sendCredentialsToLoginHandle = (event) => {
    event.preventDefault()
    login({ username: usernameProps.value, password: passwordProps.value })
    resetUsername()
    resetPassword()
  }

  return (
    <Box sx={{ mt: 3, maxWidth: 400 }}>
      <h2>Log in to application</h2>
      <form onSubmit={sendCredentialsToLoginHandle}>
        <Box sx={{ mb: 2 }}>
          <TextField fullWidth variant="standard" {...usernameProps} required />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField fullWidth variant="standard" {...passwordProps} required />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          LOGIN
        </Button>
        <Button variant="text" onClick={() => navigate('/register')}>
          Don't have an account? Sign up
        </Button>
      </form>
    </Box>
  )
}

export default LoginForm
