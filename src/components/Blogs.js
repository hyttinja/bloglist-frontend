import Blog from './Blog'
const Blogs = ({ blogs,updateBlog,deleteBlog,user }) => {

  return(
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
      )}
    </>)

}
export default Blogs