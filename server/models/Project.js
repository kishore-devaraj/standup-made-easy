const {mongoose} = require('../db/db')
const _ = require('lodash')

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minLength: 1
  }, 
  createdBy: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  },
  scrums:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scrum'
  }]
})

ProjectSchema.methods.toJSON = function () {
  let project = this
  let projectObj = project.toObject()
  return _.pick(projectObj, ['_id','projectName','createdBy'])
}


const Project = mongoose.model('Project', ProjectSchema)

module.exports = {
  Project
}