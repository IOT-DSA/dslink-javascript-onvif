var { error, cameras, DS } = require('../../context');

export default class PanTiltZoom extends DS.SimpleNode.class {
  onInvoke(params) {
    var obj = {};
    if(params.pan)
      obj.x = parseInt(params.pan);
    if(params.tilt)
      obj.y = parseInt(params.tilt);
    if(params.zoom)
      obj.zoom = parseInt(params.zoom);

    var cam = cameras[this.path.split("/")[1]];
    return new Promise((resolve, reject) => {
      cam.continuousMove(obj, (e) => {
        if(e) return reject(e);
        resolve({});
      });
    }).then(() => {
      return new Promise((resolve, reject) => {
        if(params.duration) {
          setTimeout(() => {
            cam.stop({
              panTilt: typeof(obj.zoom) === 'undefined',
              zoom: typeof(obj.zoom) !== 'undefined'
            }, () => {
              resolve();
            });
          }, parseInt(params.duration) * 1000);
        } else {
          resolve();
        }
      });
    }).catch((e) => {
      error(e);
    });
  }
}
