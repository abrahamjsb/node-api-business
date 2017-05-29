'use strict'
const express = require('express')
const prodcutCtrl = require('../controllers/business')
const api = express.Router()

api.get('/business', prodcutCtrl.getBusinesses)
api.get('/business/:id', prodcutCtrl.getBusiness)
api.post('/business/', prodcutCtrl.insertBusiness)
api.put('/business/:id', prodcutCtrl.updateBusiness)
api.delete('/business/:id', prodcutCtrl.deleteBusiness)

module.exports = api
