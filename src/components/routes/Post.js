import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import CommentIndex from './CommentIndex'
import OutlineButton from '../shared/OutlineButton.js'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router'
import messages from '../AutoDismissAlert/messages'

class Post extends Component {
  constructor (props) {
    // this makes sure that `this.props` is set in the constructor
    super(props)

    this.state = {
      // Initially, our book state will be null, until the API request finishes
      post: null,
      // initially this book has not been deleted yet
      deleted: false

    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/posts/${this.props.match.params.id}`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ post: res.data.post }))
      .catch(console.error)
  }

  destroyPost = () => {
    axios({
      url: `${apiUrl}/posts/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      // update their `deleted` state to be `true`
      .then(() => this.setState({ deleted: true }))
      .then(res => this.props.msgAlert({
        heading: 'Post Deleted Successfully',
        message: messages.postDeleteSuccess,
        variant: 'success'
      }))
      .catch(console.error)
  }
  destroyComment = (commentId) => {
    axios({
      url: `${apiUrl}/posts/${this.props.match.params.id}/comments/${commentId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(() => {
        return axios({
          url: `${apiUrl}/posts/${this.props.match.params.id}`,
          method: 'get',
          headers: {
            'Authorization': `Bearer ${this.props.user.token}`
          }
        })
      })
      .then(res => this.setState({ post: res.data.post }))
      .then(res => this.props.msgAlert({
        heading: 'Comment Deleted Successfully',
        message: messages.commentDeleteSuccess,
        variant: 'success'
      }))
      .catch(console.error)
  }
  editComment = (commentId) => {
    const newPath = `/posts/${this.props.match.params.id}/comments/${commentId}/edit`
    this.props.history.push(newPath)
  }

  render () {
    const { post, deleted } = this.state

    if (!post) {
      return <p>Loading...</p>
    }

    // if the deleted state is true
    if (deleted) {
      // redirect to the home page
      return <Redirect to={{
        pathname: '/posts',
        state: { message: 'Deleted post successfully' }
      }} />
    }

    const commentHtml = (
      <div>
        {this.state.post.comments.map(comment => (
          <CommentIndex
            key={comment._id}
            content={comment.content}
            deleteComment={() => this.destroyComment(comment._id)}
            editComment={() => this.editComment(comment._id)}
            owner={comment.owner}
            user={this.props.user._id}
          />
        ))}
      </div>
    )
    const owner = (this.props.user._id === this.state.post.owner)
    return (
      <div className='long'>
        <h3>Post:</h3>
        <div className='post'>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
          {owner ? (
            <React.Fragment>
              <Link to={`/posts/${this.props.match.params.id}/edit`}>
                <OutlineButton variant="outline-info">Edit</OutlineButton>
              </Link>
              <OutlineButton variant= "outline-danger" onClick={this.destroyPost}>Delete Post</OutlineButton>
              <Link to={`/posts/${this.props.match.params.id}/comments`}>
                <OutlineButton variant="outline-info">Comment</OutlineButton>
              </Link>
            </React.Fragment>)
            : (<React.Fragment>
              <Link to={`/posts/${this.props.match.params.id}/comments`}>
                <OutlineButton variant="outline-info">Comment</OutlineButton>
              </Link>
            </React.Fragment>)}
        </div>
        <h3>Comments:</h3>
        {commentHtml}
      </div>
    )
  }
}

export default withRouter(Post)
