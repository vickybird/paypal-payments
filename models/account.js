var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  surname: String
});

module.exports = mongoose.model('Account', accountSchema);
