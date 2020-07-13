const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')

blogRouter.delete('/api/blogs/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.body.token, process.env.SECRET)
  if (!request.body.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blogid = await Blog.findById(request.params.id)
  const user = await User.findById(decodedToken.id)
 
  if (blogid.user.toString() != user.id.toString()){
    return response.status(401).json({ error: 'user not authorized' })
  }

  const blog = await Blog.findByIdAndRemove(request.params.id).populate('user', {username:1, name:1})
  response.json(blog)
})

blogRouter.put('/api/blogs/:id', async (request, response) => {
  const blog = 
  {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    comments: request.body.comments
  }

  const update = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(blog)
})


blogRouter.get('/api/blogs/:id', async (request, response) => {
  const blogs = await Blog
    .findById(request.params.id)
    .populate('user', {username:1, name:1})
  response.json(blogs)
})

blogRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user', {username:1, name:1})

    response.json(blogs)
  })
  
blogRouter.post('/api/blogs', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.body.token, process.env.SECRET)
  if (!request.body.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({
    'title': body.title,
    'author': body.author,
    'url': body.url,
    'likes': body.likes,
    'user': user._id,
    'comments': []
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogRouter.put('/api/blogs/:id/comments', async (request, response) => {
  const blogData = await Blog.findById(request.params.id)
  const comment = request.body.comment

  const blog = 
  {
    title: blogData.title,
    author: blogData.author,
    url: blogData.url,
    likes: blogData.likes,
    comments: [...blogData.comments, comment]
  }

  const update = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(blog)
})

module.exports = blogRouter