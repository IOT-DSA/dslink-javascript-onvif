var context = require('../context'),
    { error, cameras, DS } = context,
    { CAMERA_STRUCTURE } = require('../structure'),
    Camera = require('onvif').Cam;

export default class AddDevice extends DS.SimpleNode.class {
  onInvoke(params) {
    return new Promise((accept, reject) => {
      var camera = new Camera({
        hostname: params.hostname,
        username: params.username,
        port: parseInt(params.port),
        password: params.password
      }, (err) => {
        if(err) reject(err);
        accept(camera);
      });
    }).then((camera) => {
      cameras[params.name] = camera;

      return new Promise((accept, reject) => {
        camera.getDeviceInformation((err, data) => {
          if(err) reject(err);
          accept(data);
        });
      });
    }).then((data) => {
      context.link.addNode('/' + params.name, CAMERA_STRUCTURE(params, data));

      return {};
    }).catch((err) => {
      error(err.stack);
    });
  }
}
