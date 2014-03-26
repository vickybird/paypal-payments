var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// Note: passport-local-mongoose creates username, hash and salt,
// so we don't need to define them here.
var accountSchema = mongoose.Schema({
  firstName: String,
  surname: String
});

accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema);
