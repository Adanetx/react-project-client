import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CategoryForm from '../shared/categoryForm'
import messages from '../AutoDismissAlert/messages'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router'
// import messages from '../AutoDismissAlert/messages'

class CategoryCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      category: {
        name: '',
        description: ''
      },
      createdId: null
    }
  }

  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedCategory = Object.assign({}, prevState.category, updatedField)
      return { category: editedCategory }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/categories`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { category: this.state.category }
    })
    //     .then(res => this.setState({ createdId: res.data.category._id }))
    //     .catch(console.error)
    // }
      .then(res => {
        this.props.msgAlert({
          heading: 'category Created Successfully',
          message: messages.categoryCreatedSuccess,
          variant: 'success'
        })
        return res
      })
      .then(res => this.setState({ createdId: res.data.category._id }))
      .catch(res => this.props.msgAlert({
        heading: 'category Create Failed',
        message: messages.categoryCreatedFailure,
        variant: 'danger'
      }))
  }

  render () {
    // destructure  category to show in the form below, and createdId to redirect
    const { category, createdId } = this.state
    const { handleChange, handleSubmit } = this

    // when the user hits submit to finish editing the book
    if (createdId) {
      // redirect to the show page (route)
      console.log(category)
      return <Redirect to={`/categories/${createdId}`} />
    }

    return (
      <div>
        <CategoryForm
          category={category}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath='/'
        />
      </div>
    )
  }
}

export default withRouter(CategoryCreate)
