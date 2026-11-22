import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createUser = async (userObject) => {
    const response = await axios.post(baseUrl, userObject)
    return response.data
}

export default { getAll, createUser }