var userManager = require('modules/userManager.js');
var payments = require('modules/payments.js');

module.exports = function(app) {
  app.get('/buy', userManager.ensureAuthenticated, function(req, res) {
    res.render('buyathing.jade');
  });

  app.post('/buy/thingy', userManager.ensureAuthenticated, function(req, res) {
    payments.checkout(
      function(err) {
        res.render('paymentError.jade', { error: err });
      },
      function(data) {
        res.cookie('paypalToken', data.TOKEN, { signed: true });
        res.redirect(data.PAYMENTURL);
      });
  });

  app.get('/buy/confirm', userManager.ensureAuthenticated, function(req, res) {
    payments.completePurchase(
      req.query.token,
      req.query.PayerID,
      function(err) {
        res.render('paymentError.jade', { error: err });
      },
      function(data) {
        res.render('successfulPayment.jade');
      });
  });

  app.get('/buy/cancel', userManager.ensureAuthenticated, function(req, res) {
  });
};
