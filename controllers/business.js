'use strict'
const Business = require('../models/business.js')

function getBusinesses(req, res) {
  Business.find((err, business) => {
		if(err) res.status(500).send({message: `Ha ocurrido un error intentando buscar el negocio: ${err}`})
		if(!business) res.staus(404).send({message: `El negocio no existe en nuestra base de datos`})

		res.status(200).send({business})
	})
}

function getBusiness(req, res) {
  let id = req.params.id
  Business.findById(id , (err, business) => {
    if(err) res.status(500).send({message: `Ha ocurrido un error intentando buscar el negocio: ${err}`})
    if(!business) res.status(404).send({message: `El negocio no existe en nuestra base de datos`})

    res.status(200).send({business})
  })
}

function insertBusiness(req, res) {
  let business = new Business()
	business.name = req.body.name
	business.rif = req.body.rif
	business.address = req.body.address
	business.localNumber = req.body.localNumber
	business.website = req.body.website
	business.businessType = req.body.businessType
	business.phone = req.body.phone
	business.description = req.body.description
	business.save((err, objectStored) => {
		if(err) res.status(500).send({message: `Se ha guardado satisfactoriamente en base de datos ${err}`})
		res.status(200).send({business: objectStored})
	})
}

function updateBusiness(req, res) {

  let update_fields = req.body;
  let id = req.params.id
  Business.findOneAndUpdate ({_id: id}, update_fields, (err, update) => {
    if(err) res.status(500).send({message: `Ha ocurrido un error en consulta: ${err}`})
    if(!update) res.status(404).send({message: `Comercio no encontrado`})
    res.status(200).send({update})
  })
}

function deleteBusiness(req, res) {
  let update_fields = req.body;
	let id = req.params.id
	Business.findOneAndRemove (id, (err, removed) => {
		if(err) res.status(500).send({message: `Ha ocurrido un error en su petición: ${err}`})
		if(!removed) res.status(404).send({message: `Negocio no encontrado`})
		res.status(200).send({removed})
	})
}

module.exports = {
  getBusinesses,
  getBusiness,
  insertBusiness,
  updateBusiness,
  deleteBusiness
}
