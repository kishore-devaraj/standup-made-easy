const {ObjectID} = require('mongodb')
const { Task } = require('../../server/models/Task')
const { Scrum } = require('../../server/models/Scrum')
const { Project } = require('../../server/models/Project')

const objectOneId = new ObjectID()
const objectTwoId = new ObjectID()

const projectOneObjectId = new ObjectID()
const projectTwoObjectId = new ObjectID()

const seedScrum = [{
  "name": "Scrum 1",
  "date": new Date(),
  "projectId": projectOneObjectId,
  "_id": objectOneId
}, {
  "name": "Scrum 2",
  "date": new Date(),
  "projectId": projectOneObjectId,
  "_id": objectTwoId
}]

const seedProject = [{
  "_id": projectOneObjectId,
  "projectName": "Augury",
  "createdBy": "kishoregrylls@gmail.com"
}, {
  "_id": projectTwoObjectId,
  "projectName": "Coffee",
  "createdBy": "kishoregrylls@gmail.com"
}]

function populateProject (done) {
  Project.deleteMany({})
  .then(() => {
    Project.insertMany(seedProject)
    .then(() => done())
  })
}

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



module.exports = {
  objectOneId,
  objectTwoId,
  projectOneObjectId,
  projectTwoObjectId,
  populateScrum,
  populateTask,
  populateProject
}