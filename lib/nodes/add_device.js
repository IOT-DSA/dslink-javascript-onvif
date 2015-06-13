var context = require('../context'),
    DS = require('dslink'),
    Camera = require('onvif').Cam,
    Promise = Promise || require('es6-promises');


module.exports = DS.createNode({
  onInvoke: function(params) {
    console.log(context);
    return new Promise(function(accept, reject) {
      var camera = new Camera({
        hostname: params.hostname,
        username: params.username,
        port: params.port,
        password: params.password
      }, function(err) {
        if(err) reject(err);
        accept(camera);
      });
    }).then(function(camera) {
      context.cameras[params.name] = camera;

      context.link.addNode('/' + params.name, {
        getSnapshot: {
          $is: 'getSnapshot',
          $name: 'Get JPEG Snapshot',
          $invokable: 'write',
          $columns: [
            {
              name: 'jpeg',
              type: 'binary'
            }
          ]
        },
        getStream: {
          $is: 'getStream',
          $name: 'Get MPEG Stream',
          $invokable: 'write',
          $columns: [
            {
              // temp
              name: 'uri',
              type: 'string'
            }
          ]
        },
        pan: {
          $is: 'panTiltZoom',
          $name: 'Pan Device',
          $invokable: 'write',
          $params: [
            {
              name: 'pan',
              type: 'int',
              min: -1,
              max: 1
            }, {
              name: 'seconds',
              type: 'int',
              min: 0
            }
          ]
        },
        tilt: {
          $is: 'panTiltZoom',
          $name: 'Tilt Device',
          $invokable: 'write',
          $params: [
            {
              name: 'tilt',
              type: 'int',
              min: -1,
              max: 1
            }, {
              name: 'seconds',
              type: 'int',
              min: 0
            }
          ]
        },
        zoom: {
          $is: 'panTiltZoom',
          $name: 'Zoom Device',
          $invokable: 'write',
          $params: [
            {
              name: 'zoom',
              type: 'int',
              min: -1,
              max: 1
            }, {
              name: 'seconds',
              type: 'int',
              min: 0
            }
          ]
        }
      });

      return {};
    }).catch(function(e) {
      context.error(e.stack);
    });
  }
});
