// Verify cwd is evented instance

var fs = require('fs');
var cwd = process.cwd();

var controllers, models, api, index;

var verify = function () {

  // Check for main components of architecture
  controllers = fs.existsSync(cwd + '/controllers');
  models = fs.existsSync(cwd + '/models');
  api = fs.existsSync(cwd + '/api');
  index = fs.existsSync(cwd + '/index.js');

  // If all exist, conclude (return) cwd is evented instance
  if (controllers && models && api && index) {
    return true;
  } else {
    return false;
  }

};

module.exports = verify;