var output = require('./output');
var git = require('gift');
var fs = require('fs');
var fsx = require('fs-extra');
var verify = require('./verify_evented.js');
var processManifest = require('./process_manifest.js');
var cwd = process.cwd();

var installExtension = function (repo) {

  var id = +new Date();
  var temp = cwd+'/.evented/temp/'+id;
  var manifest;

  // Ensure we're in a evented project
  if (!verify()) {
    output('error', 'Please run command from Evented.io project root.');
    return;
  }

  // Simple check for repo url and appropriate format, gift will do the rest.
  if (!repo || repo.substr(0,8) !== 'https://' || repo.substr(-4) !== '.git') {
    output('error', 'Please specify valid HTTPS repository URL.');
    return;
  }

  // Clone extension repo in .evented/temp/{id}
  output('success', 'Cloning extension to temp directory.');
  git.clone(repo, temp, function(err, _repo) {
    if (err) {
      output('error', 'Error cloning extension. Please check repository URL.');
    } else {
      if (!fs.existsSync(temp+'/evented.json')) {
        output('error', 'Could not located evented.json manifest.');
        return;
      }
      // All set to process manifest
      output('success', 'Extension successfully cloned. Installing.');
      manifest = require(temp+'/evented.json');

      processManifest(manifest, temp, cwd, function() {
        output('success', 'Cleaning up temporary files.');
        fsx.remove(temp);
      });

    }
  });


};

module.exports = installExtension;