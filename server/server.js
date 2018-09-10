const express = require('express')
const bodyParser = require('body-parser')

const db = require('./db/db')
const {Task} = require('./models/Task')

const app = express()
app.use(bodyParser.json())

app.post('/task', (req, res) => {
    let task = new Task(req.body)
    task.save().then(task => {
        res.send(task)
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