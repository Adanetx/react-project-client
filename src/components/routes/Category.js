import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import OutlineButton from '../shared/OutlineButton.js'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router'

class Category extends Component {
  constructor (props) {
    // this makes sure that `this.props` is set in the constructor
    super(props)

    this.state = {
      // Initially, our book state will be null, until the API request finishes
      category: null,
      // initially this book has not been deleted yet
      deleted: false

    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/categories/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ category: res.data.category }))
      .catch(console.error)
  }

  destroyCategory = () => {
    axios({
      url: `${apiUrl}/categories/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      // update their `deleted` state to be `true`
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    const { category, deleted } = this.state
    // if we do not have category (category is null)
    //
    console.log(category)
    // if (!category) {
      return <p>Loading...</p>
    }

    // if the deleted state is true
    if (deleted) {
      // redirect to the categories
      return <Redirect to={{
        pathname: '/categories',
        state: { message: 'Deleted post successfully' }
      }} />
    }
    return (
      <div className='long'>
        <h3>Category:</h3>
        <div className='category'>
          <h4>{category.name}</h4>
          <p>{category.description}</p>
          <Link to={`/categories/${this.props.match.params.id}/edit`}>
            <OutlineButton variant="outline-info" size="size">Edit</OutlineButton>
          </Link>
          <OutlineButton variant= "outline-danger" size="sm" onClick={this.destroyCategory}>Delete Category</OutlineButton>
        </div>
      </div>
    )
  }
}

export default withRouter(Category)
