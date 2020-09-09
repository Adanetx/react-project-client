import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PostForm from '../shared/PostForm'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router'
import messages from '../AutoDismissAlert/messages'

class PostEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      post: {
        title: '',
        content: '',
        topic: ''
      },
      updated: false
    }
  }
  componentDidMount () {
    axios(`${apiUrl}/posts/${this.props.match.params.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ post: res.data.post }))
      .catch(console.error)
  }

  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedPost = Object.assign({}, prevState.post, updatedField)
      return { post: editedPost }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/posts/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { post: this.state.post }
    })
      .then(res => this.setState({ updated: true }))
      .then(res => this.props.msgAlert({
        heading: 'Post Edited Successfully',
        message: messages.postEditedSuccess,
        variant: 'success'
      }))
      .catch(() => this.props.msgAlert({
        heading: 'Post Edit Failed',
        message: messages.postEditFailure,
        variant: 'danger'
      }))
  }

  render () {
    // destructure book to show in the form below, and createdId to redirect
    const { post, updated } = this.state
    const { handleChange, handleSubmit } = this

    // when the user hits submit to finish editing the book
    if (updated) {
      // redirect to the show page (route)
      return <Redirect to={`/posts/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <PostForm
          post={post}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/posts/${this.props.match.params.id}`}
        />
      </div>
    )
  }
}

export default withRouter(PostEdit)
