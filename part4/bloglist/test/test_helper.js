const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlog = [
  {
    title: 'g',
    author: 'gloria',
    url: 'g',
    likes: 0
  },
  {
    title: 'p',
    author: 'gloria',
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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlog,  
  blogInDb,
  usersInDb
}