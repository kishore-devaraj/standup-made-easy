const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const _ = require('lodash')

const db = require('./db/db')
const { userRouter } = require('./routes/user-routes')
const { organisationRouter } = require('./routes/organisation-routes')
const { projectRouter } = require('./routes/project-routes')
const { Task } = require('./models/Task')
const { Scrum } = require('./models/Scrum')
const { Project } = require('./models/Project')
const { User } = require('./models/User')
const { authenicate } = require('./middleware/authenticate')

const app = express()

// Static files rendering
app.use(express.static(__dirname + '/../public'))
// Using node_modules in the client side
app.use('/scripts', express.static(`${__dirname}/../node_modules/`))

app.use(bodyParser.json())
app.use('/users', userRouter)
app.use('/organisation', organisationRouter)
app.use('/project', projectRouter)

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

// Catch all method SSR 
app.use((req, res) => res.sendFile(path.resolve(`${__dirname}/../public/index.html`)))

app.listen(3000, () => {
    console.log(`Express app listening at 3000`)
})

module.exports = {
    app
}