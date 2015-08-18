var app = require('../app');
var restful = require('node-restful');
var mongoose = require('mongoose');

module.exports = app.products = restful.model('Bestelling', mongoose.Schema({
	aantal: {
		type: String,
		required: true
	},
	vornaam: {
		type: String,
		required: true
	},
	achternaam: {
		type: String,
		required: true
	},
	adres: {
		type: String,
		required: true
	},
}));