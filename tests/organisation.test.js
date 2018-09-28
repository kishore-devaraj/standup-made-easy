const expect = require('expect')
const request = require('supertest')

const { app } = require('../server/server')
const { Organisation } = require('../server/models/Organisation')
const { userOneObjectId, userTwoObjectId, seedUsers, populateOrganisation } = require('./seeds/seeds')

beforeEach(populateOrganisation)

describe('POST /organisation', () => {
  it('should create a new organisation', (done) => {
    const createOrgData = {
      "name": "tringapps"
    }
    request(app)
    .post('/organisation')
    .set('x-auth', seedUsers[0].tokens[0].token)
    .send(createOrgData)
    .expect(200)
    .expect(res => {
      expect(res.body._id).toExist()
      expect(res.body._createdBy).toExist()
      expect(res.body.name).toBe(createOrgData.name)
    })
    .end((err, res) => {
      if(err) return done(err)
      
      Organisation.find({}).then(organisations => {
        expect(organisations.length).toBe(3)
          return Promise.resolve()
      .then(() => {
        return Organisation.findById({_id: res.body._id})
          .then(organisation => {
            expect(organisation.name).toBe(createOrgData.name)
            expect(organisation._id.toHexString()).toBe(res.body._id)
            expect(organisation._createdBy.toHexString()).toBe(res.body._createdBy)
            done()
          })
        })
      }).catch(err => done(err))
    })
  })

  it('should not create new organisation with invalid or null token', (done) => {
    const createOrgData = {
      "name": "tringapps"
    }
    request(app)
    .post('/organisation')
    .set('x-auth', '')
    .send(createOrgData)
    .expect(401)
    .end((err, res) => {
      if(err) return done(err)
      
      Organisation.find({}).then(organisations => {
        expect(organisations.length).toBe(2)
        done()
      }).catch(err => done(err))
    })
  })

  it('should not create new organisation with invalid request data', (done) => {
    request(app)
    .post('/organisation')
    .set('x-auth', seedUsers[0].tokens[0].token)
    .send({})
    .expect(400)
    .end((err, res) => {
      if(err) return done(err)
      
      Organisation.find({}).then(organisations => {
        expect(organisations.length).toBe(2)
        done()
      }).catch(err => done(err))
    })
  })
})