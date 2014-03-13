var clc = require('cli-color');

// Simple output formatter
var output = function(type, message) {
  switch (type) {
    case 'success':
      console.log(clc.greenBright(' #> ') + clc.white(message));
      break;
    case 'error':
      console.log(clc.redBright(' #> ') + clc.white(message));
      break;
  }
};

module.exports = output;