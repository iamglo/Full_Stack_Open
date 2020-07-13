import React from 'react'
import ConnectedBlog from './Blog'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link
} from "react-router-dom"

const BlogList = ({ user, blogs }) => {
  return(
    <div>
      <Table striped>
        <tbody>
          <th>
            blogs
          </th>
          {blogs.length > 0 ? blogs.map(blog =>
            <tr key={blog._id}>
              <td>
                <Link to={`/blogs/${blog._id}`}> {blog.title} {blog.author}</Link>
              </td>
              <td>
                {blog.likes}
              </td>
            </tr>
          ): null}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.blogs
  }
}

const ConnectedBlogList = connect(
  mapStateToProps,
  null)(BlogList)


export default ConnectedBlogList
