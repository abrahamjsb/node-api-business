'use strict'
const express = require('express')
const prodcutCtrl = require('../controllers/business')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/business', prodcutCtrl.getBusinesses)
api.get('/business/:id', prodcutCtrl.getBusiness)
api.post('/business/', auth, prodcutCtrl.insertBusiness)
api.put('/business/:id', auth, prodcutCtrl.updateBusiness)
api.delete('/business/:id', auth, prodcutCtrl.deleteBusiness)
api.post('/signup', userCtrl.signup)
api.post('/signin', userCtrl.signin)
api.get('/admin', auth, (req, res)=>{
  res.status(200).send({message: "Te has validado satisfactoriamente"})
})




module.exports = api
