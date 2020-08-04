const dummy = (blogs) => {
 return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((b, t) => b + t.likes, 0)
}

const favoriteBlog = (blogs) => {
  const mx = blogs.reduce(function (p, c){
    return (p.likes > c.likes) ? p : c
  })

  const ans = {
    title : mx.title,
    author : mx.author,
    likes : mx.likes
  }
  
  return ans 
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}