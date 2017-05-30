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
  description: String,
  imgUrl:  {type: String,
    default: 'https://developers.google.com/maps/documentation/static-maps/images/error-image-generic.png'
  }
})

module.exports = mongoose.model('business', BusinessSchema)
