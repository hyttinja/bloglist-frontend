import { useState } from 'react'

const BlogForm =({ createBlog }) => {
  const [title, setTitle]  = useState('')
  const [url, setUrl]  = useState('')
  const [author, setAuthor]  = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author,
      title,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')

  }
  return(<form onSubmit={addBlog}>
    <h2>Create new</h2>
    <input id='title' laceholder='title' type="text" name="title" onChange={(event) => setTitle(event.target.value)} value={title}/>
    <input id='author' placeholder='author' type="text" name="author" onChange={(event) => setAuthor(event.target.value)} value={author}/>
    <input id='url' placeholder='url' type="text" name="url"  onChange={(event) => setUrl(event.target.value)} value={url}/>
    <input id='blogFormBtn' type="submit" value="create"/>
  </form>)
}
export default BlogForm