'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const crypt = require('crypto')
const Schema = mongoose.Schema

const UserSchema = Schema({
  email: {type: String, unique: true, lowercase: true},
  username: {type: String, unique: true},
  name: String,
  lastName: String,
  password: {type: String, select: false},
  signupDate: {type: Date, default: Date.now()},
  lastLoginDate: Date
})

UserSchema.pre('save', function (err, next) {
  let user = this
  if(!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if(err) return next(err)
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.gravatar = () => {
  if(!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/?${md5}?s=200&d=retro`
}

module.exports = mongoose.model('user', UserSchema)
