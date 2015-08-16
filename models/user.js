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
	admin: {
		type: Boolean,
		default: false
	}
}));