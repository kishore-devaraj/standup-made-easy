const {mongoose} = require('../db/db')

const Task = mongoose.model('Task', {
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
      required: false,
      default: 'Kishore'
   }
})

module.exports = {
  Task
}