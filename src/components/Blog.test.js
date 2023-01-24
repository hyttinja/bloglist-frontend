import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
describe('blog tests',() => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'https://testurl.fi',
    likes: 3,
    user: {
      name: 'Test user',
      username: 'Test username'
    }

  }
  const user = {
    name: 'Test user',
    username: 'Test username'
  }
  const dummyF = () => {
    console.log('dummy')
  }
  test('renders blog', () => {
    render(<Blog blog={blog} updateBlog={dummyF} deleteBlog={dummyF} user={user} />)
    const title = screen.queryByText('Test title')
    expect(title).toBeDefined()
    const author = screen.queryByText('Test author')
    expect(author).toBeNull()
    const url = screen.queryByText('https://testurl.fi')
    expect(url).toBeNull()
    const likes = screen.queryByText('likes 3')
    expect(likes).toBeNull()
  })
  test('renders blog after click "show"', async() => {
    render(<Blog blog={blog} updateBlog={dummyF} deleteBlog={dummyF} user={user} />)
    const testUser = userEvent.setup()
    const button  = screen.queryByText('show')
    await testUser.click()
    const title = screen.queryByText('Test title')
    expect(title).toBeDefined()
    const author = screen.queryByText('Test author')
    expect(author).toBeDefined()
    const url = screen.queryByText('https://testurl.fi')
    expect(url).toBeDefined()
    const likes = screen.queryByText('likes 3')
    expect(likes).toBeDefined()
  })
  test('renders blog after click "show" and like event handler is called twice after clicking "like" twice', async() => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} updateBlog={mockHandler} deleteBlog={dummyF} user={user} />)
    const testUser = userEvent.setup()
    const button  = screen.queryByText('show')
    await testUser.click(button)
    const likeButton = screen.queryByText('Like')
    await testUser.click(likeButton)
    await testUser.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})