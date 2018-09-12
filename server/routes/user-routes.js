const _ = require('lodash')
const express = require('express')
const userRouter = express.Router()

const { authenicate } = require('../middleware/authenticate')
const { User } = require('../models/User')

userRouter.route('/me')
  .get(authenicate, (req, res) => {
    res.send(req.user)
  })

userRouter.route('/')
  .post((req, res) => {
    const body = _.pick(req.body, ['email', 'password'])
    const user = new User(body)
    user.save()
      .then(user => user.generateAuthToken())
      .then(token => {
        res.set('x-auth', token).send(user)
      }).catch(err => res.status(400).send(err))
  })

userRouter.route('/signin')
  .post((req, res) => {
    let foundUser
    const body = _.pick(req.body, ['email', 'password'])
    User.findUserByCredentails(body.email, body.password)
    .then(user => {
      foundUser = user
      return user.generateAuthToken()
    })
    .then(token => {
      res.set('x-auth', token).send(foundUser)
    }).catch(err => res.status(400).send(err))
  })

module.exports = {
  userRouter
}