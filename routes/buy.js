var userManager = require('modules/userManager.js');

module.exports = function(app) {
  app.get('/buy', userManager.ensureAuthenticated, function(req, res) {
    res.render('buyathing.jade');
  });
};
