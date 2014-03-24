var fs = require('fs');

module.exports = function(app) {
  console.log('Importing routes from %s.', __dirname);
  fs.readdirSync(__dirname).forEach(function(file) {
    console.log('Importing from file %s.', file);
    if (file === 'index.js') {
      return;
    }
    var name = file.substr(0, file.indexOf('.js'));
    if (name.indexOf('.') === 0) {
      return;
    }
    require('./' + name)(app);
  });
};
