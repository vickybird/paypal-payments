var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
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
app.use(express.bodyParser());
app.use(express.cookieParser('cookme'));
app.use(express.logger('dev'));
app.use(express.session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Routes
require('./routes/index')(app);

// Listening
app.listen(port);
console.log('Listening on port %d', port);
