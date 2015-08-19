var app = require('../app');
var restful = require('node-restful');
var mongoose = require('mongoose');

module.exports = app.products = restful.model('Bestelling', mongoose.Schema({
	aantal: {
		type: String,
		required: true
	},
	naam: {
		type: String,
		required: true
	},
	adres: {
		type: String,
		required: true
	},
	productid: {
		type: String,
		required: true
	},
	userid: {
		type: String,
		required: true
	}
}));