// Starts the Evented service in dev or prod mode

var spawn = require("child_process").spawn;
var cwd = process.cwd();
var readline = require('readline');
//var verify = require('./verify_evented.js');
var output = require('./output.js');
var proc;
var productionEnv = process.env;
var options = {
  cwd: cwd
};

var startEvented = function (mode) {
  //if (verify()) {
    if (true) {

    // Start it up!
    if (mode==='prod' || mode==='production') {
      productionEnv.NODE_ENV = 'production';
      options.env = productionEnv;
    }

    // Start process
    proc = spawn('node', ['index.js', '--color'], options);

    var stdout = readline.createInterface({
      input: proc.stdout,
      terminal: false
    });

    var stderr = readline.createInterface({
      input: proc.stderr,
      terminal: false
    });

      // Listen for stdout
    stdout.on("line", function (line) {
      console.log(line);
    });

      // Listen for stderr
    stderr.on("line", function (line) {
      console.log(line);
    });

  } else {
    output('error', 'Please run command from Evented.io project root.');
  }
};

module.exports = startEvented;