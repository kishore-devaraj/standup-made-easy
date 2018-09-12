const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken')

const { Task } = require('../../server/models/Task')
const { Scrum } = require('../../server/models/Scrum')
const { Project } = require('../../server/models/Project')
const { User } = require('../../server/models/User')

const objectOneId = new ObjectID()
const objectTwoId = new ObjectID()

const projectOneObjectId = new ObjectID()
const projectTwoObjectId = new ObjectID()

const userOneObjectId = new ObjectID()
const userTwoObjectId = new ObjectID()

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

const seedUsers = [{
  _id: userOneObjectId, 
  email:'kishoregrylls@gmail.com',
  password:'someDumbPasswordOne',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneObjectId, access: 'auth'}, 'someSecret').toString()
  }]
},{
  _id: userTwoObjectId,
  email: 'kishore.devaraj@gmail.com',
  password: 'someDumbPasswordTwo',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoObjectId, access: 'auth'}, 'someSecret').toString()
  }]
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

function populateUser (done) {
  User.deleteMany({})
  .then(() => {
    return User.insertMany(seedUsers)
  }).then(() => done())
}

module.exports = {
  objectOneId,
  objectTwoId,
  projectOneObjectId,
  projectTwoObjectId,
  userOneObjectId,
  userTwoObjectId,
  populateScrum,
  populateTask,
  populateProject,
  populateUser,
  seedUsers
}