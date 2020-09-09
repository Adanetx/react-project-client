
import React from 'react'
import OutlineButton from '../shared/OutlineButton.js'

const CommentIndex = ({ content, deleteComment, editComment, owner, user }) => {
  let canEditAndUpdate = ''
  if (owner === user) {
    canEditAndUpdate = (
      <div className='comments'>
        {content} <br/>
        <br/>
        <OutlineButton size="sm" onClick={editComment} variant="outline-info">Edit</OutlineButton>
        <OutlineButton size="sm" onClick={deleteComment} variant="outline-danger">Delete</OutlineButton>
      </div>
    )
  } else if (owner !== user) {
    canEditAndUpdate = (
      <div className='comments'>
        {content}
      </div>
    )
  }

  return (
    canEditAndUpdate
  )
}

export default CommentIndex
