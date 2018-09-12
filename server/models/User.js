const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
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

// Models methods
UserSchema.statics.findUserByCredentails = function (email, password) {
    let user = this
    return user.findOne({email})
    .then(user => {
        if (!user) {
            return Promise.reject('User not found')
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user)
                } else {
                    reject('Password not matching')
                }
            })
        })
    })
}

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


// Instance methods
UserSchema.methods.toJSON = function () {
    let user = this
    let userObject = user.toObject()
    return _.pick(userObject, 'email', '_id')
}

UserSchema.methods.generateAuthToken = function () {
    let user = this
    let access = 'auth'
    let token = jwt.sign({_id: user._id.toHexString()}, 'someSecret')
    // Below line need to be modified in the future
    if(user.tokens.length !== 0) user.tokens = []
    user.tokens.push({access, token})
    return user.save().then(() => {
        return token
    })
}

UserSchema.methods.removeToken = function (token) {
    let user = this
    return user.updateOne({
        $pull: {
            tokens: {token}
        }
    })
}


// Mongoose Middlewares
UserSchema.pre('save', function (next) {
    let user = this
    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
       next()
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = {
    User
}