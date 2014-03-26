var Account = require('models/account.js');

module.exports = function(app) {
  app.get('/register', function(req, res) {
    res.render('register.jade');
  });

  app.post('/register', function(req, res) {
    Account.register(
      new Account({
        username: req.body.username,
        firstName: '',
        surname: ''
      }),
      req.body.password,
      function(err, account) {
        if (err) {
          res.render('register.jade', { message: err.message });
        } else {
          res.redirect('/account');
        }
      });
  });
};
