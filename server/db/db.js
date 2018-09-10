const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/standup'

// Change the default callback feature of mongoose to Promise.
mongoose.Promise = global.Promise
mongoose.connect(url, {useNewUrlParser: true})

module.exports = {
    mongoose
}