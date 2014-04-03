var Transaction = require('models/transaction.js');

exports.addTransaction = function(user, date, item, callback) {
  var newTransaction = new Transaction({
    user: user._id,
    timestamp: date,
    item: item,
    paymentStatus: 'CheckoutInitiated'
  });
  newTransaction.save(function(err, transaction) {
    if (err) { throw err; }
    callback(transaction);
  });
};

exports.updateTransaction = function(transactionId, updates, callback) {
  Transaction.find({ _id: transactionId }, function(err, transactions) {
    if (err) { throw err; }
    for(var key in updates) {
      transactions[0][key] = updates[key];
    }
    transactions[0].save(function(err, transaction) {
      if (err) { throw err; }
      callback(transaction);
    });
  });
};
