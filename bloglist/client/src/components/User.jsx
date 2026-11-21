import { useUsers } from '../hooks/useUsers'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const { users, isPending } = useUsers()
  const user = users?.find((u) => u.id === id)

  if (isPending) {
    return <span>Loading...</span>
  }

  if (!user) {
    return <div>user not found</div>
  }

  const { name, blogs } = user

  return (
    <div>
      <h2>{name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map((blog)=>(
            <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
