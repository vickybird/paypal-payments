module.exports = function(app) {
  app.get('/account', function(req, res) {
    res.render('account.jade',
      { user: '' });
  });
};
