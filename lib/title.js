var clc = require('cli-color');

var showTitle = function () {
  console.log(clc.greenBright("     _______    _________   __________________     ________  "));
  console.log(clc.greenBright("    / ____/ |  / / ____/ | / /_  __/ ____/ __ \\    /  _/   \\ "));
  console.log(clc.greenBright("   / __/  | | / / __/ /  |/ / / / / __/ / / / /   / // / / / "));
  console.log(clc.greenBright("  / /___  | |/ / /___/ /|  / / / / /___/ /_/ /  _/ // /_/ /  "));
  console.log(clc.greenBright(" /_____/  |___/_____/_/ |_/ /_/ /_____/_____/  /___/\\____/   "));
  console.log(clc.white(     "  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~||~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
};

module.exports = showTitle;