var express = require('express');
var router = express.Router();
var path = require('path');

var isAuthenticated = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}

module.exports = function(passport){

	router.get('/', function(req, res){
		res.render('index', {title: 'Welcome | District01', user: req.user});
	});

	router.get('/login', function(req, res){
		res.render('login', {title: 'Log in | District01', message: req.flash('message')});
	});

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

	router.get('/signup', function(req, res){
		res.render('signup', {title: 'Register | District01', message: req.flash('message')});
	});

	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	router.get('/signout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	router.get('/overzicht', isAuthenticated, function(req, res){
		res.render('overzichtProducten', {title: 'Producten | District01', user: req.user});
	});

	router.get('/product', isAuthenticated, function(req, res){
		res.render('product', {title: 'Product detail | District01', user: req.user});
	});

	router.get('/addProduct', isAuthenticated, function(req, res){
		res.render('voegToeProducten', {title: 'Voeg product toe | District01', user: req.user});
	});

	router.get('/contact', function(req, res){
		res.render('contact', {title: 'Contact | District01', user: req.user});
	});

	router.get('/OverOns', function(req, res){
		res.render('overOns', {title: 'Over ons | District01', user:req.user});
	});

	router.get('/bestellingen', isAuthenticated, function(req, res){
		res.render('bestellingen', {title: 'Bestellingen | District01', user:req.user});
	});

	return router;
}