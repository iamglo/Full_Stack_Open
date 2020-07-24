import React, { useState, useEffect, useImperativeHandle }  from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user, likeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // const likeBlog = async (blog) => {
  //   const temp =
  //   {
  //     'title': blog.title,
  //     'author': blog.author,
  //     'url': blog.url,
  //     'likes': blog.likes+1
  //   }
  //   await blogService.update(blog._id, temp)
  //   const allBlogs = await blogService.getAll()
  //   setBlogs(allBlogs.sort((a,b) => (a.likes > b.likes) ? -1 : 1))
  // }

  const deleteBlog = async () => {
    console.log(user, blog.user)
    if (user.username === blog.user.username){
      if (window.confirm(`remove ${blog.name} by ${blog.author}?`)){
        await blogService.deleteBlog(blog._id)
        const allBlogs = await blogService.getAll()
        setBlogs(allBlogs.sort((a,b) => (a.likes > b.likes) ? -1 : 1))
      }
    }
    else(
      window.alert('you are not authorized to delete this blog')
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={blogStyle} data-testid='main'>
      {blog.title} {blog.author}

      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view </button>
      </div>

      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide </button>
      </div>

      <div style={showWhenVisible} data-testid='details'>
      url: {blog.url} <br/>
      likes: {blog.likes}  <button onClick={() => (likeBlog(blog))}>like</button><br/>
      user: {blog.user.name} <br/>
        <button onClick={deleteBlog}>delete</button>
      </div>

    </div>
  )
}

export default Blog
