var { error, cameras, link, DS } = require('../context'),
    Camera = require('onvif').Cam;

export default class AddDevice extends DS.SimpleNode.class {
  constructor() {
    super();
  }

  onInvoke(params) {
    return new Promise((accept, reject) => {
      var camera = new Camera({
        hostname: params.hostname,
        username: params.username,
        port: params.port,
        password: params.password
      }, (err) => {
        if(err) reject(err);
        accept(camera);
      });
    }).then((camera) => {
      cameras[params.name] = camera;

      link.addNode('/' + params.name, {
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
    }).catch((err) => {
      error(err);
    });
  }
}
