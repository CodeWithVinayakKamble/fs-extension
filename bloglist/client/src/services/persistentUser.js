const STORAGE_KEY = 'loggedBlogAppUser'

export const saveUser = (user) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export const getUser = () => {
    const loggerUser = window.localStorage.getItem(STORAGE_KEY)
    return loggerUser ? JSON.parse(loggerUser) : null
}

export const removeUser = () => {
    window.localStorage.removeItem(STORAGE_KEY)
}

export default { saveUser, getUser, removeUser }