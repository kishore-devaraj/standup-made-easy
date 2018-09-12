const express = require('express')
const _ = require('lodash')

const { authenicate } = require('../middleware/authenticate')
const { User } = require('../models/User')
const { Organisation } = require('../models/Organisation')


const organisationRouter = express.Router()

organisationRouter.route('/')
  .post(authenicate, (req, res) => {
    let body = _.pick(req.body, ['name'])
    User.findUserByToken(req.token)
    .then(user => {
      body['_createdBy'] = user._id
      let organisation = new Organisation(body)
      return organisation.save()
    })
    .then(org => res.send(org))
    .catch(err => res.status(400).send(err))
  })


module.exports = {
  organisationRouter
}