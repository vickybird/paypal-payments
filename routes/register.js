var Account = require('models/account.js');

module.exports = function(app) {
  app.get('/register', function(req, res) {
    res.render('register.jade');
  });

  app.post('/register', function(req, res) {
    Account.find({ username: req.body.username },
      function(err, accounts) {
        if (err) { throw err; }
        console.log(accounts);
        console.log(accounts.length);
        if (accounts.length !== 0) {
          console.log('User already exists');
          res.render('register.jade', {
            userExists: true,
            username: req.body.username
          });
        } else {
          var newAccount = new Account({
            username: req.body.username,
            password: req.body.password,
            firstName: '',
            surname: ''
          });
          newAccount.save(
            function(err, account) {
              if (err) { throw err; }
              console.log('New account added: ' + newAccount);
              res.redirect('/account');
            });
        }
      });
  });
};
