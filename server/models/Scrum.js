const {mongoose} = require('../db/db')
const _ = require('lodash')

const ScrumSchema = new mongoose.Schema({
  date: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minLength: 1
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'  
  }]
})

/* Model methods */
ScrumSchema.statics.findScrumById = function (scrumId) {
  return Scrum.findById(scrumId)
}

ScrumSchema.methods.toJSON = function () {
  let scrum = this
  let scrumObj = scrum.toObject()
  return _.pick(scrumObj,['_id','date'])
}


const Scrum = mongoose.model('Scrum', ScrumSchema)

module.exports = {
  Scrum
}