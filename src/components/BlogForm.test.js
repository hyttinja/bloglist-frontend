import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('blog form tests',() => {
  test('test blog form',async() => {
    const mockHandler = jest.fn()
    const testUser = userEvent.setup()
    render(<BlogForm createBlog={mockHandler} />)

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const submitBtn = screen.queryByText('create')
    await testUser.type(titleInput,'Test title')
    await testUser.type(authorInput,'Test author')
    await testUser.type(urlInput,'Test url')
    await testUser.click(submitBtn)
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('Test title')
    expect(mockHandler.mock.calls[0][0].author).toBe('Test author')
    expect(mockHandler.mock.calls[0][0].url).toBe('Test url')
  })

})
