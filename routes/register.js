var Account = require('models/account.js');
var userManager = require('modules/userManager.js');

module.exports = function(app) {
  app.get('/register', function(req, res) {
    res.render('register.jade');
  });

  app.post('/register', function(req, res) {
    Account.register(
      new Account({
        username: req.body.username,
        firstName: req.body.firstname,
        surname: req.body.surname
      }),
      req.body.password,
      function(err, account) {
        if (err) {
          res.render('register.jade', { message: err.message });
        } else {
          userManager.login(req, res, account, function() {
            res.redirect('/account');
          });
        }
      });
  });
};
