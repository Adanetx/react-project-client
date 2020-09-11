# Application: Reacts ⚛

This application allows signed in users to post text and images of various topics such as current events, science, music, movies, sports, books, fitness, video games, pets, cooking and many more. While non-registered participants can still view posts. Users will be about to make posts on there own subject matter, search specific topics or just view random posts and comment on other users posts.

## Important Links

- [Deployed Client](https://adanetx.github.io/react-project-client/)
- [Api Repo](https://github.com/Adanetx/react-project-api)
- [Deployed API](https://git.heroku.com/obscure-depths-42422.git)
- [API Repo](https://github.com/Adanetx/react-project-api)
- [Gantt Chart](https://docs.google.com/spreadsheets/d/1hUHYbxF8i37bEgrGfgN9qWebLXFGVB-AdIgRZn4mn1o/edit?usp=sharing)

## Planning Story

When we first collaborated on what we wanted our team project to be, we had a handful of ideas. After reviewing and debating on what to build, we settled on a message board application. It started off with us creating a few user stories, then we outlined the overall feel that we wanted to achieve. Once we were settled on that aspect of the project, we moved onto how we were going to accomplish these tasks.  But before we could start diving into the frame work we needed to figure out what the design and layout was going to look like, since this was going to be a big factor in the initial setup of the application.
Entity Relationship Diagrams, along with wireframes, allowed us to get a better understanding of what we needed to facilitate this. After all that was finalized we moved onto the Project management setup.  This included a Gantt chart to help with organizing the project into smaller, more manageable tasks. Then we were ready to start coding.

### User Stories

- 'As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to add a post to the message board.
- As a signed in user, I would like to update my post on the message board.
- As a signed in user, I would like to delete my  post on the message board.
- As a signed in user, I would like to see all my posts on the message board.
- As a signed in user, I would like to view all other users' posts on the message board.
- As a signed in user, I would like to comment on other users' posts on the message board.
- As a signed in user, I would like to edit my comment on other users' posts on the message board.
- As a signed in user, I would like to delete my comment on other users' posts on the message board.'
- as a user I must able to add new category
- as a user I must see user's posted categories resource
- as a user I must delete my own category resource
- as a user I must able to update my own category resource

### Strech Goal(s)

- Allow users to comment on comments.
- Allow users to create categories or topics and add posts to specific category or topic message boards
- Allow users to add tags to a post
- Allow to create another resource with in this resource create, delete, update, ...

### Technologies Used

- MongoDB
- Mongoose
- Javascript
- React
- React Router
- html
- scss
- API
- reac Router
- axios

### Catalog of Routes for post

| Verb   | URI Pattern            |
|--------|------------------------|
| POST   | `/posts/:id/comments`  |
| PATCH  | `/posts/:id/comments/:commentid` |
| DELETE | `/posts/:id/comments/:commentid` |
| GET      | `/posts`        |
| GET      | `/posts/:id`|
| POST     | `/posts`|
| PATCH    | `/posts/:id`|
| DELETE  | `/posts/:id`|

### Catalog of Routes for category

Verb   | URI Pattern            |
|--------|------------------------|
|   |   |
| GET      | `/categories`        |
| GET      | `/category/:id`|
| POST     | `/categories`|
| PATCH    | `/categories/:id`|
| DELETE  | `/categories/:id`|




### Unsolved Problems

- Still need style the overall look and feel of the application
- Would like to eventually add a home page that renders all posts so unauthenticated users can view all posts.

## Images

#### Wireframe:
<a href="https://imgur.com/td2RI7F"><img src="https://i.imgur.com/td2RI7F.png" title="source: imgur.com" /></a>

#### Gantt chart:
<a href="https://imgur.com/a6NSTOk"><img src="https://i.imgur.com/a6NSTOk.png" title="source: imgur.com" /></a>
