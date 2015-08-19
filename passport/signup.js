var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var User = require('../models/user');

module.exports = function(passport){
	passport.use('signup', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done){
		findOrCreateUser = function(){
			User.findOne({'username': username}, function(err, user){
				if(err){
					console.log('Error in SignUp: ' + err);
					return done(err);
				}
				if(user){
					console.log('User already exists');
					return done(null, false, req.flash('message', 'User already exists'));
				} else {
					var newUser = new User();
					newUser.username = username;
					newUser.password = createHash(password);
					newUser.firstname = req.param('firstname');
					newUser.lastname = req.param('lastname');
					newUser.address = req.param('address');

					newUser.save(function(err){
						if(err){
							console.log('Error in Saving user: ' + err);
							throw err;
						}
						console.log('User Registration Succesful');
						return done(null, newUser);
					});
				}
			});
		};
		process.nextTick(findOrCreateUser);
	}));

	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(12), null);
	}
}