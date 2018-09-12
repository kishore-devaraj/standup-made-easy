const express = require('express')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const _ = require('lodash')

const db = require('./db/db')
const { Task } = require('./models/Task')
const { Scrum } = require('./models/Scrum')
const { Project } = require('./models/Project')
const { User } = require('./models/User')
const { authenicate } = require('./middleware/authenticate')

const app = express()
app.use(bodyParser.json())

app.get('/users/me', authenicate, (req, res) => {
    res.send(req.user)
})

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password'])
    const user = new User(body)
    user.save()
    .then(user => user.generateAuthToken())
    .then(token => {
        res.set('x-auth', token).send(user)
    }).catch(err => res.status(400).send(err))
})

app.post('/project', (req, res) => {
    const body = _.pick(req.body, ['projectName', 'createdBy'])
    const project = new Project(body)
    project.save().then(project => {
        res.send(project)
    }).catch(err => res.status(400).send(err))
})

app.post('/scrum', (req, res) => {
    let body = _.pick(req.body, ['name', 'projectId'])
    body['date'] = new Date().getTime()
    Project.findProjectById(body.projectId)
    .then(project => {
        let scrum = new Scrum(body)
        project.scrums.push(scrum)
        scrum.save().then(scrum => {
            res.send(scrum)
        }).catch(err => {
            res.status(400).send(err)
        })
    }).catch(err => res.status(400).send(err))

})

app.post('/task', (req, res) => {
    let body = _.pick(req.body, ['yesterday', 'today', 'blocker', 'scrumId', 'submittedBy'])
    if (!ObjectId.isValid(body.scrumId)) return res.status(400).send('Invalid ScrumId')

    Scrum.findScrumById(body.scrumId)
        .then(scrum => {
            let task = new Task(body)
            scrum.tasks.push(task)
            Promise.all([task.save(), scrum.save()])
                .then(values => res.send(task))
                .catch(err => {
                    console.log(err)
                    res.status(400).send(err)
                })
        }).catch(err => {
            res.status(400).send(err)
        })
})

app.listen(3000, () => {
    console.log(`Express app listening at 3000`)
})

module.exports = {
    app
}