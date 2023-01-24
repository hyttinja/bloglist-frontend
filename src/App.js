import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import { sortBlogsByLikes } from './utils/helperFunctions'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)


  const [message, setMessage] = useState({ message: undefined, error:false })
  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( sortBlogsByLikes(blogs) )
    ).catch(error => {
      setMessage({ text: 'Fetching blogs failed',isError:true })
      setTimeout(() => {
        setMessage({ text:undefined,isError:false })
      },3000)
    })
  }, [])
  useEffect(() => {
    const userJson = window.localStorage.getItem('userJson')
    if(userJson){
      const user = JSON.parse(userJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])
  const handleLogin = async(event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      console.log(user)
      window.localStorage.setItem('userJson',JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setMessage({ text:'Login was succesfull',error:false })
      setTimeout(() => {
        setMessage({ text:undefined, error: false })
      },3000)
    }
    catch(error){
      console.log(error.response)
      setMessage({ text:error.response.data.error,error:true })
      setTimeout(() => {
        setMessage({ text:undefined,error:false })
      },3000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('userJson')
    blogService.setToken(null)
    setUser(null)
    setMessage({ text:'Logout was succesful',error:false })
    setTimeout(() => {
      setMessage({ text:undefined, error: false })
    },3000)
  }
  const createBlog = async({ author,title,url }) => {
    try{
      const blog = await blogService.createBlog({ author,title,url })
      setBlogs(sortBlogsByLikes(blogs.concat(blog)))
      blogFormRef.current.toggleVisibility()
      setMessage({ text:`${blog.title} was created`,error:false })
      setTimeout(() => {
        setMessage({ text:undefined, error: false })
      },3000)
    }
    catch(error){
      setMessage({ text:error.response.data.error,error:true })
      setTimeout(() => {
        setMessage({ text:undefined, error: false })
      },3000)
    }
  }
  const updateBlog = async(blog) => {
    console.log(blog)
    try{
      await blogService.updateBlog(blog)
      setMessage({ text:'Blog updated succesfully',error:false })
      setTimeout(() => {
        setMessage({ text:undefined, error: false })
      },3000)

    }
    catch(error){
      setMessage({ text:error.response.data.error,error:true })
      setTimeout(() => {
        setMessage({ text:undefined, error: false })
      },3000)
    }
    finally{
      blogService.getAll().then(blogs =>
        setBlogs( sortBlogsByLikes(blogs) )
      ).catch(error => {
        setMessage({ text: 'Fetching blogs failed',isError:true })
        setTimeout(() => {
          setMessage({ text:undefined,isError:false })
        },3000)
      })
    }
  }
  const deleteBlog = async(blogId) => {
    try{
      await blogService.deleteBlog(blogId)
      setMessage({ text:'Blog deleted succesfully',error:false })
      setTimeout(() => {
        setMessage({ text:undefined, error: false })
      },3000)
    }
    catch(error){
      setMessage({ text:error.response.data.error,error:true })
      setTimeout(() => {
        setMessage({ text:undefined, error: false })
      },3000)
    }
    finally{
      blogService.getAll().then(blogs =>
        setBlogs( sortBlogsByLikes(blogs) )
      ).catch(error => {
        setMessage({ text: 'Fetching blogs failed',isError:true })
        setTimeout(() => {
          setMessage({ text:undefined,isError:false })
        },3000)
      })
    }
  }
  if (user === null) {
    return (
      <>
        <Notification message={message}/>
        <Login
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
      </>
    )
  }
  else{
    return (
      <>
        <Notification message={message}/>
        <Logout user={user} handleLogout={handleLogout}/>
        <Togglable ref={blogFormRef} buttonLabel="create blog">
          <BlogForm  createBlog={createBlog} />
        </Togglable>
        <Blogs
          user={user}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          blogs={blogs}
        />
      </>)
  }

}

export default App
