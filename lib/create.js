var repo = 'https://github.com/aitoroses/evented-seed.git';
var fs = require('fs');
var fsx = require('fs-extra');
var async = require('async');
var spawn = require("child_process").spawn;
var git = require('gift');
var cwd = process.cwd();

var output = require('./output.js');

// Well, this one creates a new project...so, yeah.
var createProject = function(name, cb) {

  var nameRegEx = /^[a-zA-Z0-9-_]+$/;
  var path = cwd + '/' + name;
  var proc;

  async.series({

    // Checks that name exists and is alpha-numeric
    checkName: function (callback) {
      if (!name || !nameRegEx.test(name)) {
        callback('Project name must consist of only letters, numbers, underscores and hyphens.');
      } else {
        callback(null);
      }
    },

    // Make sure directory does not exists
    checkDir: function (callback) {
      if (fs.existsSync(path)) {
        callback('Directory already exists: ' + path + '.');
      } else {
        callback(null);
      }
    },

    // Clone the repo
    cloneRepo: function (callback) {
      output('success', 'Cloning from Evented.io repository.');
      git.clone(repo, path, function(err, _repo) {
        if (err) {
          callback('Error cloning from source.');
        } else {
          callback(null);
        }
      });
    },

    // // Remove the .git directory
    // cleanupDir: function (callback) {
    //   output('success', 'Removing unneeded assets.');
    //   fsx.remove(path + '/.git', function (err) {
    //     if (err) {
    //       output('error', 'Could not remove .git, please update manually.');
    //     } else {
    //       callback(null);
    //     }
    //   });
    // },

    // Install dependencies
    installDeps: function (callback) {
      output('success', 'Installing dependencies via NPM.');

      // Start process
      proc = spawn('npm', ['install'], {
        cwd: path
      });

      // Check status on close
      proc.on("close", function (code) {
        if (code === 0) {
          // Success
          callback(null);
        } else {
          // Failure
          callback('NPM Install failed. Please run manually.');
        }
      });
    }

  }, function (err) {
    if (err) {
      output('error', err);
    } else {
      output('success', 'Project created at ' + path);
      // Check for callback and run (used by stage)
      if (cb && typeof cb === 'function') {
        cb();
      }
    }
  });
};

module.exports = createProject;
