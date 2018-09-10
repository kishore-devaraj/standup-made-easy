const expect = require('expect')
const request = require('supertest')

const {app} = require('../server/server')
const {Task} = require('../server/models/Task')

beforeEach((done) => {
  Task.deleteMany({}).then(() => done())
})


describe('POST /task test cases', () => {
  it('should create a new task', (done) => {
    let postData = {
      "yesterday": "Yes",
      "today": "Working on Coffee apis",
      "blocker": "No"
    }
    request(app)
    .post('/task')
    .send(postData)
    .expect(200)
    .expect(res => {
      expect(res.body.yesterday).toEqual(postData.yesterday)
      expect(res.body.today).toEqual(postData.today)
      expect(res.body.blocker).toEqual(postData.blocker)
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