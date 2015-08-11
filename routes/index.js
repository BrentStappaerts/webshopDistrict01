var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

var isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}


router.get('/', function (req, res) {
    res.render('index', { title: "home | District01!", user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', {title: "Registreren | District01!", });
});

router.get('/producten', isAuthenticated, function(req, res) {
    res.render('producten', {title: "Product toevoegen | District01!", });
});

router.get('/user', isAuthenticated, function(req, res) {
    res.render('user', {title: "Welkom | District01!", });
});

router.get('/contact', function(req, res) {
    res.render('contact', { title: "Contact | District01!",});
});

router.get('/overzicht', function(req, res){
    res.render('overzichtproducten', {title: "Producten | District01!",});
});


router.post('/register', function(req, res, next) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.render("register", {info: "Sorry. deze username is al in gebruik."});
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});


router.get('/login', function(req, res) {
    res.render('login', { title: "Login | District01!", user : req.user });
});



router.post('/login', passport.authenticate('local'), function(req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/user');

    });
});

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/index');
    });
});

router.get('/OverOns', function(req, res) {
    res.render('OverOns', { title: "Over ons | District01!", user : req.user });
});


router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
