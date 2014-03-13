var output = require('./output.js');
var fsx = require('fs-extra');
var async = require('async');
var spawn = require('child_process').spawn;
var readline = require('readline');
var cwd = process.cwd();
var i, z, src, dest;

// Processes manifest and puts contents into build dir
var processManifest = function (manifest, assetsDir, buildDir, cb) {
  buildDir = buildDir || cwd;
  output('success', 'Processing evented.json manifest.');

  if (!manifest.hasOwnProperty('assets')) {
    output('error', 'There are no assets specified in the manifest.');
    return;
  }

  // Loop through assests and copy into buildDir
  for (var dir in manifest.assets) {
    // Make sure array not empty
    if (manifest.assets[dir].length) {
      output('success', '   Loading assets in ' + dir);
      for (i=0, z=manifest.assets[dir].length; i<z; i++) {
        src = assetsDir+'/'+dir+'/'+manifest.assets[dir][i];
        dest = buildDir+'/'+dir+'/'+manifest.assets[dir][i];
        copy(src, dest);
      }
    }
  }

  // Run commands
  if (manifest.run && manifest.run.length) {
    async.eachSeries(manifest.run, function (i, callback) {
      runProcess(i, buildDir, callback);
    }, function (err) {
      if (err) {
        output('error', err);
        output('error', 'Extension installation failed.');
        if (cb && typeof cb === 'function') {
          cb();
        }
      } else {
        output('success', 'Extension successfully installed.');
        if (cb && typeof cb === 'function') {
          cb();
        }
      }
    });
  } else {
    output('success', 'Extension successfully installed.');
    if (cb && typeof cb === 'function') {
      cb();
    }
  }

};

// Handles asset copies
var copy = function (src, dest) {
  fsx.copy(src, dest, function (err) {
    if (err) {
      output('error', '   ERROR: '+err);
    }
  });
};

// Handles proc's through spawning
var runProcess = function (process, buildDir, callback) {
  output('success', 'Running command: ' + process);
  var args = process.split(" ");
  var command = args[0];
  var proc;
  var stdout;
  var stderr;

  // Set arguments by shifting array
  args.shift();

  // Spawn the command
  if (args.length) {
    proc = spawn(command, [args], {
      cwd: buildDir
    });
  } else {
    proc = spawn(command, [], {
      cwd: buildDir
    });
  }

  // Read stdout
  stdout = readline.createInterface({
    input: proc.stdout,
    terminal: false
  });

  // Read stderr
  stderr = readline.createInterface({
    input: proc.stderr,
    terminal: false
  });

  // Listen for stdout
  stdout.on("line", function (line) {
    output('success', '   '+line);
  });

  // Listen for stderr
  stderr.on("line", function (line) {
    output('error', '   '+line);
  });

  // Check status on close
  proc.on('close', function (code) {
    if (code === 0) {
    // Success
      callback(null);
    } else {
      // Failure
      callback('Process failed with code [' + code + ']');
    }
  });

};

module.exports = processManifest;
