'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BusinessSchema = Schema({
  name: String,
  rif: String,
  address: String,
  localNumber: Number,
  phone: String,
  website: String,
  businessType: String,
  description: String
})

module.exports = mongoose.model('business', BusinessSchema)
