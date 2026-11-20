import { Link } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlogs'

const BlogList = () => {
  const { blogs, isError, isPending } = useBlogs()

  if (isError) {
    return <span>blog service not available due to problems in server</span>
  }

  if (isPending) {
    return <span>Loading...</span>
  }

  const sortedBlog = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <h2>blogs</h2>
      <ul className="bloglist">
        {sortedBlog.map((blog) => {
          return (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BlogList
