import { Alert } from '@mui/material'
import { useNotificationValue } from '../../contexts/NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  if (notification === null) return null
  const { message, type } = notification
  return (
    <Alert style={{ marginBlock: 10 }} severity={type}>
      {message}
    </Alert>
  )
}

export default Notification
