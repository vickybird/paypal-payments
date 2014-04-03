var mongoose = require('mongoose');

var transactionSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  date: Date,
  item: String,
  paymentStatus: String
});

module.exports = mongoose.model('Transactions', transactionSchema);
