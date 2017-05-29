'use strict'

const http = require('http')
const config = require('./config')
const mongoose = require('mongoose');
const app = require('./app')


mongoose.connect(config.db, (err, res) => {
	if(err) throw err
	console.log("Conexión a base de datos establecida")

	app.listen(config.port, () => {
		console.log(`Server corriendo ahora con nodemon en el puerto http://localhost:${config.port}`);
	});
})
