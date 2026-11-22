import { TextField, Button, Box } from '@mui/material'
import { useBlogs } from '../../hooks/useBlogs'
import { useParams } from 'react-router-dom'
import { useField } from '../../hooks/useField'

const CommentForm = () => {
  const { reset: resetComment, ...commentProps } = useField('text', 'comment')
  const { addComment } = useBlogs()
  const { id } = useParams()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!commentProps.value.trim()) return
    addComment(id, commentProps.value)
    resetComment()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', my: 2 }}>
        <TextField
          size="small"
          placeholder="add a comment"
          aria-label="comment"
          {...commentProps}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          add comment
        </Button>
      </Box>
    </form>
  )
}
export default CommentForm
