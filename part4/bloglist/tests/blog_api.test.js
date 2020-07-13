const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
    {
        "title": "Hello",
        "author": "Gloria",
        "url": "",
        "likes": 0
    },
    {
        "title": "blogs",
        "author": "Gloria",
        "url": "",
        "likes": 100
    }
  ]
  
beforeEach(async () => {
    await Blog.deleteMany({})

    let noteObject = new Blog(initialBlogs[0])
    await noteObject.save()

    noteObject = new Blog(initialBlogs[1])
    await noteObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 0 blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
test('a specific note is within the returned notes', async () => {
const response = await api.get('/api/blogs')

const contents = response.body.map(r => r.title)

expect(contents).toContain(
    'Hello'
)
})

afterAll(() => {
  mongoose.connection.close()
})