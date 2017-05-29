'use strict'

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Business = require('./models/business')

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/buscanaco/business', (req, res) => {
	let id = req.params.id
	Business.find((err, business) => {
		if(err) res.status(500).send({message: `Ha ocurrido un error intentando buscar el negocio: ${err}`})
		if(!business) res.staus(404).send({message: `El negocio no existe en nuestra base de datos`})

		res.status(200).send({business})
	})
})

app.get('/buscanaco/business/:id', (req, res) => {
	 let id = req.params.id
	 Business.findById(id , (err, business) => {
		 if(err) res.status(500).send({message: `Ha ocurrido un error intentando buscar el negocio: ${err}`})
		 if(!business) res.status(404).send({message: `El negocio no existe en nuestra base de datos`})

		 res.status(200).send({business})
	 })
})

app.post('/buscanaco/business/', (req, res) => {
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
})

app.put('/buscanaco/business/:id', (req, res) => {

		let update_fields = req.body;
		let id = req.params.id
		Business.findOneAndUpdate ({_id: id}, update_fields, (err, update) => {
			if(err) res.status(500).send({message: `Ha ocurrido un error en consulta: ${err}`})
			if(!update) res.status(404).send({message: `Comercio no encontrado`})
			res.status(200).send({update})
		})
})

app.delete('/buscanaco/business/:id', (req, res) => {
	let update_fields = req.body;
	let id = req.params.id
	Business.findOneAndRemove (id, (err, removed) => {
		if(err) res.status(500).send({message: `Ha ocurrido un error en su petición: ${err}`})
		if(!removed) res.status(404).send({message: `Negocio no encontrado`})
		res.status(200).send({removed})
	})
})

mongoose.connect(`mongodb://localhost:27017/buscanaco`, (err, res) => {
	if(err) throw err
	console.log("Conexión a base de datos establecida")

	app.listen(port, () => {
		console.log(`Server corriendo ahora con nodemon en el puerto http://localhost:${port}`);
	});
})
