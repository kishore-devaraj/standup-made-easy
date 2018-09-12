const _ = require('lodash')

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
    ref: 'Project'
  }],
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

// Forcing mongoose to ensure the projectName is unique
OrganisationSchema.index({name: 1}, {unique: true})

OrganisationSchema.methods.toJSON = function () {
  let organisation = this
  let organisationObj = organisation.toObject()
  return _.pick(organisationObj, 'name','_createdBy', '_id')
}

const Organisation = mongoose.model('Organisation', OrganisationSchema)

module.exports = {
  Organisation
}
