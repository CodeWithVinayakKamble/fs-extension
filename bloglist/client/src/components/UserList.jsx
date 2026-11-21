import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

import { Link } from 'react-router-dom'

import { useUsers } from '../hooks/useUsers'

const UserList = () => {
  const { users, isError, isPending } = useUsers()

  if (isError) {
    return <span>user service not available due to problems in server</span>
  }

  if (isPending) {
    return <span>Loading...</span>
  }

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'action.hover', '& th': { fontWeight: 'bold' } }}>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user?.name}</Link>
                </TableCell>
                <TableCell>{user?.username}</TableCell>
                <TableCell>{user?.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
