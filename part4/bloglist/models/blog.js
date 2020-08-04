const mongoose = require('mongoose')

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
  likes: Number
})

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

module.exports =  mongoose.model('Blog', blogSchema)
