var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('models/account.js');
var userManager = require('modules/userManager.js');

passport.serializeUser(userManager.serializeUser);
passport.deserializeUser(userManager.deserializeUser);

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
        userManager.login(req, res, user, function() {
          var redirectTo = req.cookies.redirectTo ? req.cookies.redirectTo : '/account';
          res.clearCookie('redirectTo');
          res.redirect(redirectTo);
        });
      } else {
        res.render('login.jade', { message: info.message });
      }
    })(req, res);
  });

  app.get('/logout', function(req, res) {
    userManager.logout(req, res, function() {
      res.redirect('/login');
    });
  });
};
