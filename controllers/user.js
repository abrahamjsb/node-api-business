'user strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')


function signup(req, res) {
  const user = new User( {
  email : req.body.email,
  username : req.body.username,
  name : req.body.name,
  lastName : req.body.lastName
})
  user.save(function (err) {
    if(err) res.status(500).send({message: `No se pudo registrar el usuario: ${err}`})
    res.status(201).send({message:'Te has registrado satisfactoriamente', token: service.createToken(user)})
  })
}

function signin(req, res) {
  User.find({email: req.body.email}, (err, user) => {
    if(err) res.status(500).send({message: `Ha ocurrido un problema intentando iniciar sesión: ${err}`})
    if(!user) res.status(404).send({message: `Usuario no encontrado...`})

    req.user = user
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user)
    })
  })
}

module.exports = {
  signup,
  signin
}
