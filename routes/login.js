var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('models/account.js');
var userManager = require('modules/userManager.js');

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

module.exports = function(app) {
  app.use(passport.initialize());
  passport.use(Account.createStrategy());

  app.get('/login', function(req, res) {
    userManager.isAuthenticated(
      req,
      function() { res.redirect('/account'); },
      function() { res.render('login.jade'); });
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
