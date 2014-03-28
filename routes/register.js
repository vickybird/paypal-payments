var Account = require('models/account.js');
var userManager = require('modules/userManager.js');

module.exports = function(app) {
  app.get('/register', function(req, res) {
    res.render('register.jade');
  });

  app.post('/register', function(req, res) {
    if (req.body.password !== req.body.password2) {
      res.render('register.jade', { message: 'Given passwords are different, please re-enter and try again.' });
    } else {
    Account.register(
      new Account({
        username: req.body.username,
        firstName: req.body.firstName,
        surname: req.body.surname,
        email: req.body.email
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
    }
  });
};
