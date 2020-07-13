import blogService from '../services/blogs'

const initialState = {
  blogs: [],
  curBlog: []
}

const reducer = (state = initialState, action) => {
  switch(action.type){
  case 'LIKE':{
    const content = action.data
    const id = action.data._id
    return Object.assign({}, state, {
      blogs: state.blogs.map(a => a._id !== id ? a: content).sort((a,b) => a.likes>b.likes ? -1:1)
    })
  }
  case 'ADD':{
    return Object.assign({}, state, {
      blogs: state.blogs.concat(action.data).sort((a,b) => (a.likes > b.likes) ? -1 : 1)
    })
  }
  case 'INIT_ALL':{
    return Object.assign({}, state, {
      blogs: action.data.sort((a,b) => (a.likes > b.likes) ? -1 : 1)
    })
  }
  case 'INIT_CUR':{
    return Object.assign({}, state, {
      curBlog: action.data
    })
  }
  case 'DELETE':{
    return Object.assign({}, state, {
      blogs: state.blogs.filter((x) => x._id !== action.data._id)
    })
  }
  default:
    return state
  }
}

export const init = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_ALL',
      data: blogs
    })
  }
}

export const initCurBlog = (id) => {
  return async dispatch => {
    const blog = await blogService.get(id)
    dispatch({
      type: 'INIT_CUR',
      data: blog
    })
  }
}

export const likeBlog = (id) => {
  return async dispatch => {
    let toLike =  await blogService.get(id)
    const mod = { ...toLike, likes: toLike.likes+1 }
    await blogService.update(id, mod)
    dispatch({
      type: 'LIKE',
      data: mod
    })
    dispatch({
      type: 'INIT_CUR',
      data: mod
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    let toDelete =  await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE',
      data: toDelete
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD',
      data: newBlog
    })
  }
}

export const addComment = (id, commentString) => {
  return async dispatch => {
    const commentObj = { comment: commentString }
    const newBlog = await blogService.addComment(id, commentObj)
    dispatch({
      type: 'INIT_CUR',
      data: newBlog
    })
  }
}

export default reducer