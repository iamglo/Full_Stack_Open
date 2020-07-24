import React, { useState, useEffect, useImperativeHandle }  from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ user, setAlert, setBlogs, createBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    try {
    //   await blogService.create({
    //     'title' : newTitle,
    //     'author': newAuthor,
    //     'url' : newUrl,
    //     'user' : user,
    //     'likes' : 0
    //   })

      await createBlog({
        'title' : newTitle,
        'author': newAuthor,
        'url' : newUrl,
        'user' : user,
        'likes' : 0
      })
      setAlert(`${newTitle} successfully added`)
      setTimeout(() => {
        setAlert(null)
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')

      // inputRef.current.toggleVisibility()
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a,b) => (a.likes > b.likes) ? -1 : 1))

    } catch (exception) {
      setAlert(exception)
      setTimeout(() => {
        setAlert(null)
      }, 5000)
    }
  }

  return(
    <div className="formDiv">
      <form onSubmit={addBlog}>
    title:
        <input id='title' data-testid='title' value={newTitle} onChange={({ target }) => setTitle(target.value)} /> <br/>
    author:
        <input id='author' data-testid='author' value={newAuthor} onChange={({ target }) => setAuthor(target.value)}/> <br/>
    url:
        <input id='url' data-testid='url' value={newUrl} onChange={({ target }) => setUrl(target.value)} /> <br/>
        <button type="submit">create</button> <br/><br/>

      </form>
    </div>
  )
}

export default BlogForm