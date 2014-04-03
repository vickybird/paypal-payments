var Accounts = require('models/account.js');

exports.serializeUser = function(user, done) {
  done(null, user);
};

exports.deserializeUser = function(obj, done) {
  done(null, obj);
};

exports.login = function(req, res, user, next) {
  login(req, user, function() {
    res.cookie('user', user.username, { signed: true });
    next();
  });
};

exports.logout = function(req, res, next) {
  res.clearCookie('user');
  next();
};

exports.ensureAuthenticated = function(req, res, next) {
  res.cookie('redirectTo', req.path);
  if (verifyCookie(req)) {
    if (!req.isAuthenticated()) {
      Accounts.find(
        { username: req.signedCookies.user },
        function(err, accounts) {
          if (err) { throw err; }
          if (accounts === 0) {
            throw 'No account found.';
          }
          login(req, accounts[0], next);
        });
    } else {
      next();
    }
  } else {
    res.redirect('/login');
  }
};

exports.isAuthenticated = function(req, successCallback, failureCallback) {
  if (verifyCookie(req)) {
    successCallback();
  } else {
    failureCallback();
  }
};

// 
// Private Functions
//

function login(req, user, callback) {
  req.logIn(user, function(err) {
    if (err) { throw err; }
    callback();
  });
}

function verifyCookie(req) {
  if (req.signedCookies.user) { return true; }
  return false;
}
