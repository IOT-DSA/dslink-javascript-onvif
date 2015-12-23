var context = require('../context'),
    { error, cameras, DS } = context,
    { CAMERA_STRUCTURE } = require('../structure'),
    Camera = require('onvif').Cam;

export default DS.createNode({
  onInvoke(params) {
    var prettyName = `@${params.hostname}:${params.port}`;
    return new Promise((accept, reject) => {
      console.log(`Adding new camera ${prettyName}, with username ${params.username}.`);
      var camera = new Camera({
        hostname: params.hostname,
        username: params.username,
        port: parseInt(params.port),
        password: params.password
      }, (err) => {
        if(err) {
          reject(err);
          return;
        }
        accept(camera);
      });
    }).then((camera) => {
      console.log(`Camera ${prettyName} loaded successfully, getting device information.`);
      cameras[params.name] = camera;

      return new Promise((accept, reject) => {
        camera.getDeviceInformation((err, data) => {
          if(err) {
            reject(err);
            return;
          }
          accept(data);
        });
      });
    }).then((data) => {
      console.log(`Camera ${prettyName} device information added successfully, adding node.`);
      context.link.addNode('/' + params.name, CAMERA_STRUCTURE(params, data));

      return {};
    }).catch((err) => {
      error(err.stack);
    });
  }
});
