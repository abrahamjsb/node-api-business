'use strict'

const services = require('../services/')

function isAuth(req, res, next) {
  if(!req.headers.authorization) res.status(401).send({message: 'No tienes permiso para esta sección'})

  const token = req.headers.authorization.split(" ")[1]

  services.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response =>{
      res.status(response.status).send(response.message)
    })
}

module.exports = isAuth
