var app = require('../app');
var restful = require('node-restful');
var mongoose = require('mongoose');

module.exports = app.products = restful.model('Products', mongoose.Schema({
	type: {
		type: String,
		required: true
	},
	product: {
		type: String,
		required: true
	},
	merk: {
		type: String,
		required: true
	},
	prijs: {
		type: String,
		required: true
	},
	foto: {
		type: String,
		required: true
	}
}));