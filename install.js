var fs = require('fs'),
    path = require('path'),
    crypto = require('crypto'),
    child = require('child_process');

function npmInstall() {
  var MD5_PATH = path.join(__dirname, ".dslink.md5");

  var file = fs.readFileSync(path.join(__dirname, "package.json"));

  var md5 = "";
  if(fs.existsSync(MD5_PATH)) {
    md5 = fs.readFileSync(MD5_PATH).toString("utf8");
  }

  var hash = crypto.createHash("md5");
  hash.update(file);
  var base = hash.digest("base64");

  if(base !== md5) {
    fs.writeFileSync(MD5_PATH, base);

    var npm = child.exec("npm install --production");
    console.log("running npm install");
    npm.stdout.on('data', function(data) {
      console.log(data);
    });
  }
}

npmInstall();
