var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.logger('dev'));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/register', function(req, res) {
  res.render('register.jade');
});

app.post('/register', function(req, res) {
  res.redirect('/account');
});

app.get('/account', function(req, res) {
  res.render('account.jade',
    { user: '' });
});

app.listen(port);
console.log('Listening on port %d', port);
