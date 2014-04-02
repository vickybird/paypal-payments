var userManager = require('modules/userManager.js');
var transactions = require('modules/transactions.js');
var payments = require('modules/payments.js');

module.exports = function(app) {
  app.get('/buy', userManager.ensureAuthenticated, function(req, res) {
    res.render('buyathing.jade');
  });

  app.get('/buy/thingy', userManager.ensureAuthenticated, function(req,res) {
    res.render('checkout.jade', { item: 'thingy', itemDisplayName: 'a Thingy' });
  });

  app.post('/buy/thingy', userManager.ensureAuthenticated, function(req, res) {
    payments.checkout(
      'Thingy',
      function(err) {
        res.render('paymentError.jade', { error: err });
      },
      function(data) {
        res.cookie('paypalToken', data.TOKEN, { signed: true });
        transactions.addTransaction(
          req.user,
          new Date(data.TIMESTAMP),
          'Thingy',
          function(transaction) {
            res.cookie('transactionId', transaction._id, { signed: true });
            res.redirect(data.PAYMENTURL);
          });
      });
  });

  app.get('/buy/confirm', userManager.ensureAuthenticated, function(req, res) {
    payments.getPaymentDetails(
      req.query.token,
      function(err) {
        res.render('paymentError.jade', { error: err });
      },
      function(data) {
        var transactionId = req.signedCookies.transactionId;
        transactions.updateTransaction(
          transactionId,
          { paymentStatus: data.CHECKOUTSTATUS },
          function(transaction) {
            res.render('confirmPayment.jade',
              {
                token: req.query.token,
                payerId: req.query.PayerID,
                itemPrice: data.ITEMAMT,
                shipping: data.SHIPPINGAMT,
                totalPrice: data.AMT,
                itemName: data.PAYMENTREQUEST_0_DESC
              });
          });
      });
  });

  app.post('/buy/confirm', userManager.ensureAuthenticated, function(req, res) {
    payments.completePurchase(
      req.query.token,
      req.query.payerid,
      function(err) {
        res.render('paymentError.jade', { error: err });
      },
      function(data) {
        var transactionId = req.signedCookies.transactionId;
        transactions.updateTransaction(
          transactionId,
          { paymentStatus: 'Completed' },
          function(transaction) {
            res.render('successfulPayment.jade');
          });
      });
  });

  app.get('/buy/cancel', userManager.ensureAuthenticated, function(req, res) {
    var transactionId = req.signedCookies.transactionId;
    transactions.updateTransaction(
      transactionId,
      { paymentStatus: 'Cancelled' },
      function(transaction) {
        res.clearCookie('transactionId');
        res.render('paymentCancelled.jade');
      });
  });
};
