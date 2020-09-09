import React from 'react'
import { Link } from 'react-router-dom'
import OutlineButton from './OutlineButton.js'

const CategoryForm = ({ category, handleSubmit, handleChange, cancelPath }) => (
  <div className='long'>
    <form onSubmit={handleSubmit}>
      <label>name:</label><br/>
      <input
        placeholder='Enter a name'
        value={category.name}
        name='name'
        onChange={handleChange}
      /><br/>

      <label>description:</label><br/>
      <input
        placeholder='description...'
        value={category.description}
        name='description'
        onChange={handleChange}
      /><br/>
      <OutlineButton size="sm" variant="outline-success" type="submit">Submit</OutlineButton>
      <Link to={cancelPath}>
        <OutlineButton size="sm" variant="outline-dark">Cancel</OutlineButton>
      </Link>
    </form>
  </div>
)

export default CategoryForm
