import { useState } from 'react'

export const useField = (type = 'text', label = '') => {
  const [value, setValue] = useState('')
  const onChange = (event) => setValue(event.target.value)
  const reset = () => setValue('')

  return {
    value,
    onChange,
    type,
    label,
    reset,
  }
}
