import { useNavigate } from 'react-router-dom'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useField } from '../../hooks/useField'
import { useAuth } from '../../contexts/UserContext'

const UserRegistration = () => {
  const { reset: resetUsername, ...usernameProps } = useField('text', 'Username')
  const { reset: resetPassword, ...passwordProps } = useField('password', 'Password')
  const { reset: resetName, ...nameProps } = useField('text', 'Full Name')

  const navigate = useNavigate()
  const { register } = useAuth()

  const createUser = (event) => {
    event.preventDefault()

    const user = {
      username: usernameProps.value,
      name: nameProps.value,
      password: passwordProps.value,
    }

    register(user)

    resetUsername()
    resetName()
    resetPassword()
  }

  return (
    <Box sx={{ maxWidth: 400, margin: '40px auto' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Create an Account
      </Typography>
      <form onSubmit={createUser}>
        <Box sx={{ mb: 2 }}>
          <TextField fullWidth {...usernameProps} required />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField fullWidth {...nameProps} required />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField fullWidth {...passwordProps} required />
        </Box>
        <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mb: 1 }}>
          Sign Up
        </Button>
      </form>
      <Button fullWidth variant="text" onClick={() => navigate('/login')}>
        Already have an account? Log in
      </Button>
    </Box>
  )
}

export default UserRegistration
