const lodash = require('lodash')

const User = require('../models/users')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    if (blogs.length === 0 ) {
        return 0
    }
    else {
        const reducer = (sum, b) => {
            return sum + (b['likes']||0)
        } 

        return blogs.reduce(reducer,0)
    }
}

const favoriteBlog = (blogs) => {
    const blog = blogs.reduce((mx, b) => (mx["likes"] > b["likes"] ? mx:b),0)
    return blog
} 

const mostBlogs = (blogs) => {
    const auth = blogs.map(b => b.author)
    const byAuth = lodash.countBy(auth)
    return Object.keys(byAuth).reduce((a,b) => {return byAuth[a] > byAuth[b] ? a:b})
}

// const mostLikes = (blogs) => {
// }

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    usersInDb
}