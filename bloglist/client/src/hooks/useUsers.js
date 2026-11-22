import userService from '../services/users'
import { useQuery } from '@tanstack/react-query'

export const useUsers = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  return {
    isPending: result.isPending,
    isError: result.isError,
    users: result.data,
  }
}
