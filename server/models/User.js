const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const { mongoose } = require('../db/db')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid email'
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token : {
            type: String,
            required: true
        }
    }]
})

UserSchema.statics.findUserByToken = function (token) {
    let decoded
    try {
        decoded = jwt.verify(token, 'someSecret')
    } catch (e) {
        return Promise.reject()
    }
    return User.findOne({
        _id : decoded._id,
        'tokens.access': 'auth',
        'tokens.token': token
    })
}

UserSchema.methods.toJSON = function () {
    let user = this
    let userObject = user.toObject()
    return _.pick(userObject, 'email', '_id')
}

UserSchema.methods.generateAuthToken = function () {
    let user = this
    let access = 'auth'
    let token = jwt.sign({_id: user._id.toHexString()}, 'someSecret')
    user.tokens.push({access, token})
    return user.save().then(() => {
        return token
    })
}

const User = mongoose.model('User', UserSchema)

module.exports = {
    User
}