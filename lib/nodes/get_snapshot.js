var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    context = require('../context'),
    DS = require('dslink'),
    Promise = Promise || require('es6-promises');

module.exports = DS.createNode({
  onCreated: function() {
    var cam = context.cameras[this.path.split("/")[1]];
    this.valueReady = false;
    this.uri = new Promise(function(resolve, reject) {
      cam.getSnapshotUri(function(e, uri) {
        if(e) return reject(e);
        resolve(uri.uri.trim());
      }.bind(this));
    }.bind(this)).catch(function(e) {
      context.error(e.stack);
    });
  },
  onInvoke: function() {
    var cam = context.cameras[this.path.split("/")[1]];
    return this.uri.then(function(uri) {
      return new Promise(function(resolve, reject) {
        var opt = url.parse(uri);
        opt.auth = cam.username + ':' + cam.password;

        http.get(opt, function(res) {
          if(typeof(res.statusCode) === 'number' && res.statusCode !== 200) {
            reject(res.statusCode);
            return;
          }

          var data = [];

          res.on('data', function(buf) {
            data.push(buf);
          });

          res.on('end', function() {
            resolve(Buffer.concat(data));
          });
        }).on('error', function(e) {
          context.error(e);
        });
      });
    }).then(function(data) {
      return {
        jpeg: data
      };
    }.bind(this)).catch(function(e) {
      context.error(e);
    });
  }
});
