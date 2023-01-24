import axios from 'axios'
const baseUrl = '/api/login'

const login = async(credentials) => {
  const response = await axios.post(baseUrl,{ username:credentials.username,password:credentials.password })
  return response.data
}

export default { login }