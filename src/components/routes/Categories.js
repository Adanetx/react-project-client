import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router'
import messages from '../AutoDismissAlert/messages'

// This will be our Books Index component (show all books)
class Categories extends Component {
  constructor (props) {
    super(props)

    // setup our initial state
    this.state = {
      // we have zero books, until our API request has finished
      categories: []
    }
  }

  // this is called whenever our component is created and inserted
  // into the DOM (first appears)
  componentDidMount () {
    axios({
      url: `${apiUrl}/categories`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => this.setState({ categories: res.data.categories }))
    // .then(res => console.log(res))
      .catch(res => this.props.msgAlert({
        heading: 'category Index Failed',
        message: messages.categoryIndexFailure,
        variant: 'danger'
      }))
  // .catch(console.error)
  }
  render () {
    const categories = null
    if (this.state.categories) {
      const categories = this.state.categories.map(category => (
        <div key={category._id} className='categories'>
          <Link to={`/categories/${category._id}`}>
            {category.name}
          </Link>
        </div>
      ))
      return categories
    }
    return (
      <div className='long'>
        <h1>Categories</h1>
        {categories}
      </div>
    )
  }
}

export default withRouter(Categories)
