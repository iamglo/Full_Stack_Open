const Blog = require('../models/blog')

const initialBlog = [
  {
    title: 'g',
    author: 'g',
    url: 'g',
    likes: 0
  },
  {
    title: 'p',
    author: 'p',
    url: 'p',
    likes: 100
  },
]

// const nonExistingId = async () => {
//   const note = new Note({ content: 'willremovethissoon' })
//   await note.save()
//   await note.remove()

//   return note._id.toString()
// }

const blogInDb = async () => {
  const blog = await Blog.find({})
  return blog.map(b => b.toJSON())
}

module.exports = {
  initialBlog,  blogInDb
}