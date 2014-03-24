var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('models/account.js');

passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(obj, done) { done(null, obj); });

module.exports = function(app) {
  app.use(passport.initialize());

  passport.use(new LocalStrategy(
    function(username, password, done) {
      Account.find({ username: username }, function(err, accounts) {
        if (err) { throw err; }
        if (accounts.length === 0 ||
          accounts[0].password !== password) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, accounts[0]);
      });
    })
  );

  app.get('/login', function(req, res) {
    res.render('login.jade');
  });

  app.post('/login', function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { throw err; }
      if (user) {
        res.redirect('/account');
      } else {
        res.render('login.jade', { message: info.message });
      }
    })(req, res);
  });
};
