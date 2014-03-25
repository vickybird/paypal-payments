exports.serializeUser = function(user, done) {
  done(null, user);
};

exports.deserializeUser = function(obj, done) {
  done(null, obj);
};

exports.login = function(req, res, user, next) {
  req.login(user, {}, function(err) {
    if (err) { throw err; }
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
  if (req.isAuthenticated() && verifyCookie(req, req.user.username)) {
    return next();
  }
  res.redirect('/login');
};

// 
// Private Functions
//

function verifyCookie(req, username) {
  if (req.signedCookies.user === username) { return true; }
  return false;
}
