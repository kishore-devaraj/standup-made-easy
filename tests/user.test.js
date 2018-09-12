const expect = require('expect')
const request = require('supertest')

const { app } = require('../server/server')
const { User } = require('../server/models/User')
const { populateUser, userOneObjectId, userTwoObjectId, seedUsers } = require('./seeds/seeds')

beforeEach(populateUser)

describe('POST /users', () => {
  it('should create new user', (done) => {
    let newUser = {
      "email": "kishore.dev@gmail.com",
      "password": "bestPasswordInTheWorld"
    }
    request(app)
    .post('/users')
    .send(newUser)
    .expect(200)
    .expect(res => {
      expect(res.body._id).toExist()
      expect(res.body.email).toBe(newUser.email)
      expect(res.headers['x-auth']).toExist()
    })
    .end((err, res) => {
      if (err) return done(err)
      User.findById(res.body._id).then(user => {
        expect(user).toExist()
        expect(user.email).toBe(newUser.email)
        return User.find({}).then(users => {
          expect(users.length).toBe(3)
          done()
        })
      }).catch(err => done(err))
    })
  })
   
  it('should not create duplicate user', (done) => {
    let duplicateUser = {
      "email": "kishore.devaraj@gmail.com",
      "password": "bestPasswordInTheWorld"
    }
    request(app)
    .post('/users')
    .send(duplicateUser)
    .expect(400)
    .end((err, res) => {
      if (err) return done(err)
      User.find({}).then(users => {
        expect(users.length).toBe(2)
        done()
      }).catch(err => done(err))
    })
  })

  it('should not create user with invalid data', (done) => {
    request(app)
    .post('/users')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) return done(err)
      User.find({}).then(users => {
        expect(users.length).toBe(2)
        done()
      }).catch(err => done(err))
    })
  })

  it('should return user details with valid token', (done) => {
    request(app)
    .get('/users/me')
    .set('x-auth', seedUsers[0].tokens[0].token)
    .expect(200)
    .expect(res => {
      expect(res.body._id).toExist()
      expect(res.body.email).toBe(seedUsers[0].email)
    })
    .end(err => done(err))
  })
})