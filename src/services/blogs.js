import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  console.log(token)
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const createBlog = async(blog) => {
  const config ={
    headers: { Authorization: token }
  }
  console.log(config)
  const response = await axios.post(baseUrl,blog,config)
  return response.data
}
const updateBlog = async(blog) => {
  const config ={
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`,blog,config)
  return response.data
}
const deleteBlog = async(blogId) => {
  const config ={
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`,config)
  return response.data
}
export default { getAll,createBlog,setToken,updateBlog,deleteBlog }