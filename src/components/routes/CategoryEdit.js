import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CategoryForm from '../shared/categoryForm'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router'
import messages from '../AutoDismissAlert/messages'

class CategoryEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      category: {
        name: '',
        description: ''
      },
      updated: false
    }
  }
  // componentDidMount () {
  //   axios(`${apiUrl}/categories/${this.props.match.params.id}`)
  //     .then(res => this.setState({ category: res.data.category }))
  //     .catch(console.error)
  // }
  componentDidMount () {
    axios(`${apiUrl}/categories/${this.props.match.params.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ category: res.data.category }))
      .catch(console.error)
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
      url: `${apiUrl}/categories/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { category: this.state.category }
    })
    //     .then(res => this.setState({ updated: true }))
    //     .catch(console.error)
    // }
      .then(res => this.setState({ updated: true }))
      .then(res => this.props.msgAlert({
        heading: 'category Edited Successfully',
        message: messages.categoryEditedSuccess,
        variant: 'success'
      }))
      .catch(res => this.props.msgAlert({
        heading: 'category Edit Failed',
        message: messages.categoryEditFailure,
        variant: 'danger'
      }))
  }

  render () {
    // destructure book to show in the form below, and createdId to redirect
    const { category, updated } = this.state
    const { handleChange, handleSubmit } = this

    // when the user hits submit to finish editing the book
    if (updated) {
      // redirect to the show page (route)
      return <Redirect to={`/categories/${this.props.match.params.id}`} />
      // return <Redirect to={'/categories/'}/>
    }

    return (
      <div>
        <CategoryForm
          category ={category}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          // cancelPath={`/categories/${this.props.match.params.id}`}
          cancelPath={`/categories/${this.props.match.params.id}`}
        />
      </div>
    )
  }
}

export default withRouter(CategoryEdit)
