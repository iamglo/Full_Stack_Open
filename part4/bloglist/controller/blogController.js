const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { endsWith } = require('lodash')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { usersInDb } = require('../test/test_helper')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('users', {username:1, name:1, id:1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  let body = request.body

  if (!body.likes){
    body = {...body, likes : 0}
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({...body, user: user._id})
  const saved = await blog.save()
  user.blogs = user.blogs.concat(saved._id)
  await user.save()

  response.status(200).json(saved)
})

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  // const user = await User.findById(decodedToken.id)

  const id = request.params.id
  const toDelete = await Blog.findById(id)

  if (toDelete.user.toString() === decodedToken.id){
    const blogs = await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } else{
    return response.status(401).json({ error: 'not authorized to delete' })
  }
})


blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updated = {
    title: body.title,
    author: body.author,
    likes: body.likes
  }

  const blogs = await Blog.findByIdAndUpdate(request.params.id, updated, {new:true})
  response.json(blogs)
})


module.exports = blogRouter