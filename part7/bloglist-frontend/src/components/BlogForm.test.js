import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const setAlert = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} setAlert={setAlert}/>
  )

  const title = component.getByTestId('title')
  const author = component.getByTestId('author')
  const url = component.getByTestId('url')

  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'TITLE' }
  })
  fireEvent.change(author, {
    target: { value: 'AUTHOR' }
  })
  fireEvent.change(url, {
    target: { value: 'URL' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('TITLE')
  expect(createBlog.mock.calls[0][0].author).toBe('AUTHOR')
  expect(createBlog.mock.calls[0][0].url).toBe('URL')
})