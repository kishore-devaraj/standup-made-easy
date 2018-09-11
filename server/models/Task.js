const {mongoose} = require('../db/db')
const _ = require('lodash')

const TaskSchema = new mongoose.Schema({
  yesterday: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
 },
 today: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
 }, 
 blocker: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
 },
 submittedBy: {
    type: String,
    required: true,
    trim: true
 },
 scrumId: {
   type: mongoose.Schema.Types.ObjectId,
   required: true,
 }
})

TaskSchema.methods.toJSON = function () {
  let task = this
  let taskObj = task.toObject()
  return _.pick(taskObj, ['scrumId','submittedBy','_id'])
}

const Task = mongoose.model('Task', TaskSchema)

module.exports = {
  Task
}