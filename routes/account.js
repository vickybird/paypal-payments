var userManager = require('modules/userManager.js');

module.exports = function(app) {
  app.get('/account', userManager.ensureAuthenticated, function(req, res) {
    res.render('account.jade',
      { user: req.user.firstName });
  });
};
