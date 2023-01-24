import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, updateBlog,deleteBlog,user }) => {
  const [blogShown,setBlogShown] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const addLikeToBlog = async() => {
    const updatedBlog = {
      id: blog.id,
      likes: blog.likes+1,
    }
    updateBlog(updatedBlog)

  }
  const removeBlog = async() => {
    if(window.confirm('Do you want to delete this blog?')){
      deleteBlog(blog.id)
    }
  }
  console.log(blog.user)
  console.log(user)
  return(<div style={blogStyle}>
    <div>
      {blog.title}
    </div>
    <button className='showBtn' onClick={() => setBlogShown(!blogShown)}>{blogShown ?'hide' :'show'}</button>
    {blogShown &&
    <>
      <div>
        {blog.author}
      </div>
      <div>
        {blog.url}
      </div>
      <div>
      likes {blog.likes} <button onClick={() => addLikeToBlog()}>Like</button>
      </div>
      <div>
        {blog.user ? blog.user.name: ''}
      </div>
      <div>
        {(blog.user && blog.user.username === user.username) &&<button onClick={() => removeBlog()}>Remove</button>}
      </div>
    </>}
  </div>)
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog