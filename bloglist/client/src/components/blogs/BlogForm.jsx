import { TextField, Button, Box } from '@mui/material'
import { useBlogs } from '../../hooks/useBlogs'
import { useField } from '../../hooks/useField'

const BlogForm = () => {
  const { addNewBlog } = useBlogs()
  const { reset: resetTitle, ...titleProps } = useField('text', 'title')
  const { reset: resetAuthor, ...authorProps } = useField('text', 'author')
  const { reset: resetUrl, ...urlProps } = useField('text', 'url')

  const createNewBlog = (event) => {
    event.preventDefault()

    addNewBlog({
      title: titleProps.value,
      author: authorProps.value,
      url: urlProps.value,
    })

    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <Box sx={{ mt: 3, maxWidth: 500 }}>
      <h2>create new</h2>
      <form onSubmit={createNewBlog}>
        <Box sx={{ mb: 2 }}>
          <TextField fullWidth {...titleProps} placeholder="title" required />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField fullWidth {...authorProps} placeholder="author" required />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField fullWidth {...urlProps} placeholder="url" required />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          CREATE
        </Button>
      </form>
    </Box>
  )
}

export default BlogForm
