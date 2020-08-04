const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let noteObject = new Blog(helper.initialBlog[0])
  await noteObject.save()

  noteObject = new Blog(helper.initialBlog[1])
  await noteObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blog')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('number of blogs is same as initialization', async () => {
  const response = await api.get('/api/blog')

  expect(response.body).toHaveLength(helper.initialBlog.length)
})

test('_id is a unique identifier', async () => {
  const response = await api.get('/api/blog')
  const blogs = response.body

  for (i = 0; i < blogs.length; i++) {
    expect(blogs[i]._id).toBeDefined();
  }
})

test('a valid blog can be added ', async () => {
  const newBlog = {
      title: 'test',
      author: 'test',
      url: 'test',
      likes: 0
  }
  
  await api
    .post('/api/blog')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogInDb()
  expect(blogAtEnd).toHaveLength(helper.initialBlog.length + 1)

})

test('adding blog without likes defaults 0 likes', async () => {
  const newBlog = {
      title: 'test',
      author: 'test',
      url: 'test',
  }
  
  await api
    .post('/api/blog')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogInDb()
  expect(blogAtEnd).toHaveLength(helper.initialBlog.length + 1)

  expect(blogAtEnd[blogAtEnd.length-1].likes).toBeDefined();

  expect(blogAtEnd[blogAtEnd.length-1].likes).toBe(0)
})

test('adding blog without url triggers 400 error', async () => {
  const newBlog = {
      title: 'test',
      author: 'test',
  }
  
  await api
    .post('/api/blog')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})