const express = require('express')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const _ = require('lodash')

const db = require('./db/db')
const { Task } = require('./models/Task')
const { Scrum } = require('./models/Scrum')

const app = express()
app.use(bodyParser.json())

app.post('/task', (req, res) => {
    let body = _.pick(req.body, ['yesterday', 'today', 'blocker', 'scrumId','submittedBy'])
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

app.post('/scrum', (req, res) => {
    let body = _.pick(req.body, ['name'])
    body['date'] = new Date().getTime()
    let scrum = new Scrum(body)
    scrum.save().then(scrum => {
        res.send(scrum)
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