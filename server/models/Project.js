const uniqueValidator = require('mongoose-unique-validator')
const _ = require('lodash')

const {mongoose} = require('../db/db')

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minLength: 1
  },
  _organisationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Organisation'
  },
  _createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  scrums:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scrum'
  }]
})


// ProjectSchema.index({projectName: 1, _organisationId: 1}, {unique: true})
ProjectSchema.plugin(uniqueValidator)

ProjectSchema.statics.findProjectById = function(projectId) {
  return Project.findById(projectId)
}

ProjectSchema.methods.toJSON = function () {
  let project = this
  let projectObj = project.toObject()
  let resBody = _.pick(projectObj, ['_id','projectName','_createdBy'])
  

  // Sending the projectName alone in the response
  let projectName_org = resBody.projectName
  projectName_org = projectName_org.split(' ')
  projectName_org.shift()
  resBody.projectName = projectName_org.join(' ')

  return resBody
}

ProjectSchema.pre('save', function (next) {
  let project = this
  let projectName = project._organisationId + ' ' + project.projectName
  project.projectName = projectName
  next()
})




const Project = mongoose.model('Project', ProjectSchema)

module.exports = {
  Project
}