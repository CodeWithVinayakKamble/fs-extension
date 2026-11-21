import { TextField, Button, Box } from '@mui/material'
import { useBlogs } from '../hooks/useBlogs'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const CommentForm = () => {
  const [comment, setComment] = useState('')
  const { addComment } = useBlogs()
  const { id } = useParams()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!comment.trim()) return
    addComment(id, comment)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', my: 2 }}>
        <TextField
          size="small"
          placeholder="add a comment"
          aria-label="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          add comment
        </Button>
      </Box>
    </form>
  )
}
export default CommentForm
