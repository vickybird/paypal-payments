var PayPalEC = require('paypal-ec');
var paypal = new PayPalEC(
  {
    username: process.env.PAYPALEC_USERNAME,
    password: process.env.PAYPALEC_PASSWORD,
    signature: process.env.PAYPALEC_SIGNATURE
  },
  {
    sandbox: (process.env.NODE_ENV !== 'production'),
    version: '95.0'
  });

var paymentPlan = {
  returnUrl : 'http://localhost:3000/buy/confirm',
  cancelUrl : 'http://localhost:3000/buy/cancel',
  SOLUTIONTYPE : 'sole',
  PAYMENTREQUEST_0_AMT : '10.00',
  PAYMENTREQUEST_0_DESC : 'One-time Purchase',
  PAYMENTREQUEST_0_CURRENCYCODE : 'GBP',
  PAYMENTREQUEST_0_PAYMENTACTION : 'Sale',
  L_PAYMENTREQUEST_0_ITEMCATEGORY0 : 'Digital',
  L_PAYMENTREQUEST_0_NAME0 : 'One-time',
  L_PAYMENTREQUEST_0_AMT0 : '10.00',
  L_PAYMENTREQUEST_0_QTY0 : '1'
};

exports.checkout = function(errorCallback, successCallback) {
  paypal.set(
    paymentPlan,
    function(err, data) {
      if(err) {
        errorCallback(err);
      } else {
        successCallback(data);
      }
    });
};

exports.completePurchase = function(token, payerId, errorCallback, successCallback) {
  var plan = paymentPlan;
  plan.TOKEN = token;
  plan.PAYERID = payerId;
  paypal.do_payment(
    paymentPlan,
    function(err, data) {
      if(err) {
        errorCallback(err);
      } else {
        successCallback(data);
      }
    });
};
