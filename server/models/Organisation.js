const _ = require('lodash')
const uniqueValidator = require('mongoose-unique-validator')


const { mongoose } = require('../db/db')
const OrganisationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    minlength: 1
  },
  _createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true
  },
  projects:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  }],
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

// Forcing mongoose to ensure the organisationName is unique
// OrganisationSchema.index({name: 1}, {unique: true})
OrganisationSchema.plugin(uniqueValidator)

OrganisationSchema.statics.findOrganisationById = function (organisationId) {
  return Organisation.findById({_id: organisationId})
  .then(org => {
    if(!org) {
      return Promise.reject()
    }
    return org
  })
}

OrganisationSchema.methods.toJSON = function () {
  let organisation = this
  let organisationObj = organisation.toObject()
  return _.pick(organisationObj, 'name','_createdBy', '_id')
}

const Organisation = mongoose.model('Organisation', OrganisationSchema)

module.exports = {
  Organisation
}
