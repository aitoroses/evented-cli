var commander = require('commander');
var args;

var showTitle = require('./title.js');
var createProject = require('./create.js');
var startEvented = require('./start.js');
var installExtension = require('./install.js');
var output = require('./output.js');

// Primary function which handles arguments and routes to appropriate function
var convertMod = function () {

  // Show the title
  showTitle();

  // Get the arrrrgs!
  args = commander.parse(process.argv).args;

  switch (args[0]) {
    case 'create':
      createProject(args[1]);
      break;
    case 'start':
      startEvented(args[1] || 'dev');
      break;
    case 'install':
      installExtension(args[1]);
      break;
    default:
      output('error', 'Sorry, your command does not compute.');
  }

};

exports.convert = convertMod;