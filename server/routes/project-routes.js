const express = require('express')
const _ = require('lodash')

const { authenicate } = require('../middleware/authenticate')
const { Project } = require('../models/Project')
const { Organisation } = require('../models/Organisation')

const projectRouter = express.Router()

projectRouter.route('/')
    .post(authenicate, (req, res) => {
        const body = _.pick(req.body, ['projectName', 'organisationId'])
        Organisation.findOrganisationById(body.organisationId)
        .then(organisation => {
            body['_createdBy'] = req.user._id
            body['_organisationId'] = organisation._id
            const project = new Project(body)
            project.save().then((project) => {
                organisation.projects.push(project)
                organisation.save().then(organisation => {
                    res.send(project)
                }).catch(err => res.status(400).send(err))
            }).catch(err => res.status(400).send(err))
        })
        .catch(err => res.status(400).send(err))
    })

module.exports = {
    projectRouter
}