var userManager = require('modules/userManager.js');
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
      res,
      req.user,
      'Thingy',
      function(err) {
        res.render('paymentError.jade', { error: err });
      },
      function(data) {
        res.cookie('paypalToken', data.TOKEN, { signed: true });
        res.redirect(data.PAYMENTURL);
      });
  });

  app.get('/buy/confirm', userManager.ensureAuthenticated, function(req, res) {
    payments.getPaymentDetails(
      req,
      req.query.token,
      function(err) {
        res.render('paymentError.jade', { error: err });
      },
      function(data) {
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

  app.post('/buy/confirm', userManager.ensureAuthenticated, function(req, res) {
    payments.completePurchase(
      req,
      req.query.token,
      req.query.payerid,
      function(err) {
        res.render('paymentError.jade', { error: err });
      },
      function(data) {
        res.render('successfulPayment.jade');
      });
  });

  app.get('/buy/cancel', userManager.ensureAuthenticated, function(req, res) {
    res.render('paymentCancelled.jade');
  });
};
