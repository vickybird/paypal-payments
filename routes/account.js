var userManager = require('modules/userManager.js');

module.exports = function(app) {
  app.get('/account', userManager.ensureAuthenticated, function(req, res) {
    res.render('account.jade',
      { user: req.user.firstName });
  });

  app.get('/changepassword', userManager.ensureAuthenticated, function(req, res) {
    res.render('changePassword.jade');
  });

  app.post('/changepassword', userManager.ensureAuthenticated, function(req, res) {
    req.user.authenticate(req.body.oldPassword, function(err, user, info) {
      if (err) { throw err; }
      if (!user) {
        res.render('changePassword.jade', { message: info.message });
      } else {
        if (req.body.newPassword != req.body.newPassword2) {
          res.render('changePassword.jade', { message: 'New passwords don\'t match.' });
        } else {
          req.user.setPassword(req.body.newPassword, function(err, account) {
            if (err) {
              res.render('changePassword.jade', { message: err.message });
            } else {
              account.save();
              res.render('changePassword.jade', { message: 'Password successfully changed!' });
            }
          });
        }
      }
    });
  });
};
