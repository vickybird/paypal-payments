var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var Account = require('models/account.js');
var port = process.env.PORT || 3000;

// Db setup
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connection open.');
});

// Express setup
var app = express();

app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.logger('dev'));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/register', function(req, res) {
  res.render('register.jade');
});

app.post('/register', function(req, res) {
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
});

app.get('/account', function(req, res) {
  res.render('account.jade',
    { user: '' });
});

// Listening
app.listen(port);
console.log('Listening on port %d', port);
