var context = require('../context'),
    DS = require('dslink'),
    Promise = Promise || require('es6-promises');

module.exports = DS.createNode({
  onInvoke: function(params) {
    var obj = {};
    if(params.pan)
      obj.x = parseInt(params.pan);
    if(params.tilt)
      obj.y = parseInt(params.tilt);
    if(params.zoom)
      obj.zoom = parseInt(params.zoom);

    var cam = context.cameras[this.path.split("/")[1]];
    return new Promise(function(resolve, reject) {
      cam.continuousMove(obj, function(e) {
        if(e) return reject(e);
        resolve({});
      });
    }.bind(this)).then(function() {
      return new Promise(function(resolve, reject) {
        if(params.duration) {
          setTimeout(function() {
            cam.stop({
              panTilt: typeof(obj.zoom) === 'undefined',
              zoom: typeof(obj.zoom) !== 'undefined'
            }, function() {
              resolve();
            });
          }, parseInt(params.duration) * 1000);
        } else {
          resolve();
        }
      });
    }).catch(function(e) {
      context.error(e);
    });
  }
});
