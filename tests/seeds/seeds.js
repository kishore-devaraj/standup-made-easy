const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { Task } = require('../../server/models/Task')
const { Scrum } = require('../../server/models/Scrum')
const { Project } = require('../../server/models/Project')
const { User } = require('../../server/models/User')
const { Organisation } = require('../../server/models/Organisation')

const objectOneId = new ObjectID()
const objectTwoId = new ObjectID()

const projectOneObjectId = new ObjectID()
const projectTwoObjectId = new ObjectID()

const userOneObjectId = new ObjectID()
const userTwoObjectId = new ObjectID()

const orgOneObjectId = new ObjectID()
const orgTwoObjectId = new ObjectID()

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
  "_createdBy": userOneObjectId,
  "_organisationId": orgOneObjectId
}, {
  "_id": projectTwoObjectId,
  "projectName": "Coffee",
  "_createdBy": userTwoObjectId,
  "_organisationId": orgTwoObjectId
}]

const seedUsers = [{
  _id: userOneObjectId, 
  email:'kishoregrylls@gmail.com',
  password: 'someDumbPasswordOne',
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

const seedOrg = [{
  _id: orgOneObjectId,
  name: "Tringapps",
  _createdBy: userOneObjectId,
  projects : [
    projectOneObjectId
  ]
},{
  _id: orgTwoObjectId,
  name: "Google",
  _createdBy: userTwoObjectId,
  projects : [
    projectTwoObjectId
  ]
}]

function populateProject (done) {
  Project.deleteMany({})
  .then(() => {
    Project.insertMany(seedProject)
    .then(() => done())
  }).catch(err => done(err))
}

function populateScrum (done) {
  Scrum.deleteMany({})
  .then(() => {
    return Scrum.insertMany(seedScrum)
  }).then(() => done())
  .catch(err => done(err))
}

function populateTask (done) {
  Task.deleteMany({})
  .then(() => done())
  .catch(err => done(err))
}

function populateUser (done) {
  User.deleteMany({})
  .then(() => {
    let user1 = new User(seedUsers[0]).save()
    let user2 = new User(seedUsers[1]).save()

    return Promise.all([user1, user2])
  }).then(() => done())
  .catch(err => done(err))
}

function populateOrganisation (done) {
  Organisation.deleteMany({})
  .then(() => {
    let org1 = new Organisation(seedOrg[0]).save()
    let org2 = new Organisation(seedOrg[1]).save()

    return Promise.all([org1, org2])
  }).then(() => done())
  .catch(err => done(err))
}

module.exports = {
  objectOneId,
  objectTwoId,
  projectOneObjectId,
  projectTwoObjectId,
  userOneObjectId,
  userTwoObjectId,
  orgOneObjectId,
  orgTwoObjectId,
  populateScrum,
  populateTask,
  populateProject,
  populateUser,
  seedUsers,
  populateOrganisation
}