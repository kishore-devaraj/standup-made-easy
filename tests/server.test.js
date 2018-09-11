const expect = require('expect')
const request = require('supertest')

const { app } = require('../server/server')
const { Task } = require('../server/models/Task')
const { Scrum } = require('../server/models/Scrum')
const { Project } = require('../server/models/Project')
const { populateScrum, populateTask, objectOneId, objectTwoId, populateProject, 
          projectOneObjectId, projectTwoObjectId} = require('./seeds/seeds')

beforeEach(populateProject)
beforeEach(populateScrum)
beforeEach(populateTask)

describe('POST /scrum', () => {
  let scrumData = {
    "name": "Scrum 3",
    "projectId": projectOneObjectId
  }

  it('should create a new scrum', (done) => {
    request(app)
      .post('/scrum')
      .send(scrumData)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toExist()
        expect(res.body.date).toExist()
      })
      .end((err, res) => {
        if (err) return done(err)

        Scrum.find({})
          .then(scrums => {
            expect(scrums.length).toBe(3)
            expect(scrums[2]._id.toHexString()).toBe(res.body._id)
            expect(scrums[2].date).toBe(res.body.date)
            done()
          }).catch(err => done(err))
      })
  })

  it('should not create scrum with invalid data', (done) => {
    request(app)
      .post('/scrum')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        Scrum.find({}).then(scrums => {
          expect(scrums.length).toBe(2)
          done()
        }).catch(err => done(err))
      })
  })
})


describe('POST /task test cases', () => {
  it('should create a new task', (done) => {
    let postData = {
      "yesterday": "Yes",
      "today": "Working on Coffee apis",
      "blocker": "No",
      "submittedBy": "kishoregrylls@gmail.com",
      "scrumId": objectOneId
    }
    request(app)
    .post('/task')
    .send(postData)
    .expect(200)
    .expect(res => {
      expect(res.body._id).toExist()
      expect(res.body.scrumId).toBe(objectOneId.toHexString())
      expect(res.body.submittedBy).toBe(postData.submittedBy)
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      }

      Task.find().then((tasks) => {
        expect(tasks.length).toBe(1)
        expect(tasks[0].yesterday).toBe(postData.yesterday)
        expect(tasks[0].today).toBe(postData.today)
        expect(tasks[0].blocker).toBe(postData.blocker)
        done()
      }).catch(err => done(err))
    })
  })

  it('should not create new task with invalid data', (done) => {
    request(app)
    .post('/task')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err)
      }

      Task.find().then(tasks => {
        expect(tasks.length).toBe(0)
        done()
      }).catch(err => done(err))
    })
  })

})

describe('POST /project', () => {
  it('should create project', (done) => {
    let projectData = {
      "projectName": "Kishore",
      "createdBy": "kishoregryllsdfs@gmail.com"
    }
    request(app)
    .post('/project')
    .send(projectData)
    .expect(200)
    .expect(res => {
      expect(res.body._id).toExist()
      expect(res.body.projectName).toBe(projectData.projectName)
      expect(res.body.createdBy).toBe(projectData.createdBy)
    })
    .end((err, res) => {
      if(err) return done(err)

      Project.find({}).then(projects => {
        expect(projects.length).toBe(3)
        expect(projects[2]._id.toHexString()).toBe(res.body._id)
        expect(projects[2].projectName).toBe(res.body.projectName)
        expect(projects[2].createdBy).toBe(res.body.createdBy)
        done(err)
      }).catch(err => done(err))
    })
  })

  it('should not create project on invalid data', (done) => {
    request(app)
    .post('/project')
    .send({})
    .expect(400)
    .end((err, res) => {
      if(err) return done(err)

      Project.find({}).then(projects => {
        expect(projects.length).toBe(2)
        done(err)
      }).catch(err => done(err))
    })
  })
})