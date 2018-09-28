const expect = require('expect')
const request = require('supertest')
const { app } = require('../server/server')
const { userOneObjectId, orgOneObjectId, orgTwoObjectId,
  populateProject, populateScrum, populateTask, populateOrganisation,
  seedUsers } = require('./seeds/seeds')
const { Project } = require('../server/models/Project')
const { Organisation } = require('../server/models/Organisation')

beforeEach(populateScrum)
beforeEach(populateTask)
beforeEach(populateProject)
beforeEach(populateOrganisation)

describe('POST /project', () => {
  it('should create project', (done) => {
    let projectData = {
      "projectName": "Gmail",
      "organisationId": orgTwoObjectId
    }
    request(app)
      .post('/project')
      .set('x-auth', seedUsers[0].tokens[0].token)
      .send(projectData)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toExist()
        expect(res.body.projectName).toBe(projectData.projectName)
        expect(res.body.createdBy).toBe(projectData.createdBy)
      })
      .end((err, res) => {
        if (err) return done(err)

        Project.find({}).then(projects => {
          expect(projects.length).toBe(3)
          expect(projects[2]._id.toHexString()).toBe(res.body._id)
          expect(projects[2].projectName.split(' ')[1]).toBe(res.body.projectName)
          expect(projects[2].createdBy).toBe(res.body.createdBy)
          done(err)
        }).catch(err => done(err))
      })
  })

  it('should not create project on invalid data', (done) => {
    request(app)
      .post('/project')
      .send({})
      .set('x-auth', seedUsers[0].tokens[0].token)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)

        Project.find({}).then(projects => {
          expect(projects.length).toBe(2)
          done(err)
        }).catch(err => done(err))
      })
  })
  it('should not create project on invalid data', (done) => {
    let projectData = {
      "projectName": "Gmail",
      "organisationId": orgTwoObjectId
    }
    request(app)
      .post('/project')
      .send({})
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)

        Project.find({}).then(projects => {
          expect(projects.length).toBe(2)
          done(err)
        }).catch(err => done(err))
      })
  })
})