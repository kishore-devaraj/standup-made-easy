const {ObjectID} = require('mongodb')
const { Task } = require('../../server/models/Task')
const { Scrum } = require('../../server/models/Scrum')
const { Project } = require('../../server/models/Project')

const objectOneId = new ObjectID()
const objectTwoId = new ObjectID()

const seedScrum = [{
  "name": "Scrum 1",
  "date": new Date(),
  "_id": objectOneId
}, {
  "name": "Scrum 2",
  "date": new Date(),
  "_id": objectTwoId
}]

function populateScrum (done) {
  Scrum.deleteMany({})
  .then(() => {
    return Scrum.insertMany(seedScrum)
  }).then(() => done())
}

function populateTask (done) {
  Task.deleteMany({})
  .then(() => done())
}

function populateProject (done) {
  Project.deleteMany({})
  .then(() => done())
}

module.exports = {
  objectOneId,
  objectTwoId,
  populateScrum,
  populateTask,
  populateProject
}