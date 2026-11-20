import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blog'
import { useNotify } from '../contexts/NotificationContext'
import { useNavigate } from 'react-router-dom'

export const useBlogs = () => {
    const queryClient = useQueryClient()
    const notify = useNotify()
    const navigate = useNavigate()

    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
        refetchOnWindowFocus: false,
        retry: 1
    })

    const newBlogMutation = useMutation({
        mutationFn: blogService.create,
        onSuccess: (newBlog) => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
            notify(`a new blog '${newBlog.title}' by ${newBlog.author} added`, 'success')
            navigate('/')
        },
        onError: (error) => {
            notify(error.response.data.error)
        }
    })



    return {
        isPending: result.isPending,
        isError: result.isError,
        blogs: result.data,
        addNewBlog: (newBlogObject) => newBlogMutation.mutate(newBlogObject)
    }
}