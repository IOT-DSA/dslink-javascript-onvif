var fs = require('fs'),
    path = require('path'),
    child = require('child_process');

if(!fs.existsSync(path.join(__dirname, "node_modules"))) {
  var npm = child.exec("npm install");
  console.log("running npm install");
  npm.stdout.on('data', function(data) {
    console.log(data);
  });
}
