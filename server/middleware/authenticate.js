const { User } = require('../models/User')

function authenicate (req, res, next) {
 const token = req.get('x-auth')
  User.findUserByToken(token)
  .then(user => {
      if(!user) {
          return Promise.reject()
      }
      req.user = user
      req.token = token
      next()
  }).catch(err => res.status(401).send())
}

module.exports = {
  authenicate
}
