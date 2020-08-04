const mongoose = require('mongoose')
const config = require('../utils/config')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required : true
  },
  author: String,
  url: {
    type: String,
    required : true
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})


module.exports =  mongoose.model('Blog', blogSchema)
