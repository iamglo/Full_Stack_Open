import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import Blog from './Blog'

test('renders content', () => {
  const blog = {
    'title': 'test',
    'author': 'test',
    'url': 'url',
    'likes': 0,
    'user': { 'name': 'test' }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.getByTestId('details')).not.toBeVisible()
  expect(component.getByTestId('main')).toBeVisible()
})

test('clicking the view event handler shows details', () => {
  const blog = {
    'title': 'test',
    'author': 'test',
    'url': 'test',
    'likes': 0,
    'user': { 'name': 'test' }
  }

  const component = render(
    <Blog blog={blog}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.getByTestId('details')).toBeVisible()
})

test('clicking the like button calls event handler once', () => {
  const blog = {
    'title': 'test',
    'author': 'test',
    'url': 'test',
    'likes': 0,
    'user': { 'name': 'test' }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} likeBlog={mockHandler}/>
  )

  const button = component.getByText('like')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})