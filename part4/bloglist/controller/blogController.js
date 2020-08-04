const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { endsWith } = require('lodash')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  if (!request.body.likes){
    request.body = {...request.body, likes : 0}
  }
  const blog = new Blog(request.body)
  const saved = await blog.save()
  response.status(200).json(saved)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogs = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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