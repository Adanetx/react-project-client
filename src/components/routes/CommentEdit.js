import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CommentForm from '../shared/CommentForm'
import messages from '../AutoDismissAlert/messages'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router'
// import messages from '../AutoDismissAlert/messages'

class CommentEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: {
        content: ''
      },
      updated: false,
      postId: null
    }
  }

  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedComment = Object.assign({}, prevState.comment, updatedField)
      return { comment: editedComment }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/posts/${this.props.match.params.id}/comments/${this.props.match.params.commentid}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { comment: this.state.comment }
    })
      .then(res => this.props.msgAlert({
        heading: 'Comment Edited Successfully',
        message: messages.commentEditSuccess,
        variant: 'success'
      }))
      .then(res => this.setState({ updated: true }))
      .catch(() => this.props.msgAlert({
        heading: 'Comment Edit Failed',
        message: messages.commentEditFailure,
        variant: 'danger'
      }))
  }

  render () {
    // destructure book to show in the form below, and createdId to redirect
    const { comment, updated } = this.state
    const { handleChange, handleSubmit } = this

    // when the user hits submit to finish editing the book
    if (updated) {
      // redirect to the show page (route)
      return <Redirect to={`/posts/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <CommentForm
          comment={comment}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/posts/${this.props.match.params.id}`}
        />
      </div>
    )
  }
}

export default withRouter(CommentEdit)
