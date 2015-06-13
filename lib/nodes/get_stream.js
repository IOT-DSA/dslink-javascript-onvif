var context = require('../context'),
    DS = require('dslink'),
    Promise = Promise || require('es6-promises');

module.exports = DS.createNode({
  onInvoke: function() {
    var cam = context.cameras[this.path.split("/")[1]];
    return new Promise(function(resolve, reject) {
      cam.getStreamUri({
        protocol: 'HTTP'
      }, function(e, stream) {
        if(e) return reject(e);
        console.log(stream);
        resolve({
          uri: stream.uri.toString()
        });
      });
    }).catch(function(e) {
      context.error(e);
    });
  }
});
