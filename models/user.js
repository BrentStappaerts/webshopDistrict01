var app = require('../app');
var restful = require('node-restful');
var mongoose = require('mongoose');

module.exports = app.users = restful.model('Users', mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	admin: {
		type: Boolean,
		default: false
	}
}));