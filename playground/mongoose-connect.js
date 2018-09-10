const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/standup',{useNewUrlParser: true})

let User = mongoose.model('User', {
    username: {
        type: String
    }, password: {
        type: String
    }
}) 

let user = new User({
    username: 'Kishore',
    password: 'password'
})

user.save().then(user => {
    console.log(user)
}).catch((e) => {
    console.log(err)
})

