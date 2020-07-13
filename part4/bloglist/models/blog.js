const mongoose = require('mongoose')

// const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: Array
  })


module.exports = mongoose.model('Blog', blogSchema)