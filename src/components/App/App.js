import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Posts from '../routes/Posts'
import PostCreate from '../routes/PostCreate'
import Post from '../routes/Post'
import PostEdit from '../routes/PostEdit'

import Categories from '../routes/Categories'
import CategoryCreate from '../routes/CategoryCreate'
import Category from '../routes/Category'
import CategoryEdit from '../routes/CategoryEdit'

import CommentCreate from '../routes/CommentCreate'
import CommentEdit from '../routes/CommentEdit'
import { withRouter } from 'react-router'
import Home from '../routes/Home'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    // console.log('in messge alert')
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} exact path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/posts' render={ () => (
            <Posts user={user} />
          )}/>
          <AuthenticatedRoute user={user} exact path='/posts-create' render={ () => (
            <PostCreate user={user} msgAlert={this.msgAlert} setCreatedId={this.setCreatedId}/>
          )}/>
          <AuthenticatedRoute user={user} exact path='/posts/:id' render={ (props) => (
            <Post {...props} user={user} msgAlert={this.msgAlert} setDeleted={this.setDeleted}/>
          )}/>
          <AuthenticatedRoute user={user} exact path='/posts/:id/edit' render={ (props) => (
            <PostEdit {...props} user={user} msgAlert={this.msgAlert} setUpdated={this.setUpdated}/>
          )}/>
          <AuthenticatedRoute user={user} exact path='/categories' render={ () => (
            <Categories user={user} msgAlert={this.msgAlert} setCreatedId={this.setCreatedId}/>
          )}/>
          <AuthenticatedRoute user={user} exact path='/categories-create' render={ () => (
            <CategoryCreate user={user} msgAlert={this.msgAlert} setCreatedId={this.setCreatedId}/>
          )}/>
          <AuthenticatedRoute user={user} exact path='/categories/:id' render={ (props) => (
            <Category {...props} user={user} msgAlert={this.msgAlert} setDeleted={this.setDeleted}/>
          )}/>
          <AuthenticatedRoute user={user} exact path='/categories/:id/edit' render={ (props) => (
            <CategoryEdit {...props} user={user} msgAlert={this.msgAlert} setUpdated={this.setUpdated}/>
          )}/>
          <AuthenticatedRoute user= {user} exact path='/posts/:id/comments' render={ (props) => (
            <CommentCreate {...props} user={user} msgAlert={this.msgAlert} setCreated={this.setCreated}/>
          )}/>
          <AuthenticatedRoute user={user} exact path='/posts/:id/comments/:commentid/edit' render={ (props) => (
            <CommentEdit {...props} user={user} msgAlert={this.msgAlert} setUpdated={this.setUpdated}/>
          )}/>
          <Route exact path='/' component={Home} />
        </main>
      </Fragment>
    )
  }
}

export default withRouter(App)
